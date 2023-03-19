from django.contrib import admin
from django.http.response import HttpResponse
from django.template.defaultfilters import slugify
import csv
import json
from .models import User, UserRequest , Participation


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_filter = ('is_phone_no_verified', 'has_filled_profile', 'is_from_fcrit','department', 'semester','criteria') #'money_owed')
  search_fields = ('roll_no', 'name', 'email', 'phone_no')
  list_display = ['roll_no','name', 'department','semester','criteria','phone_no',]
  actions = ['export_as_csv','export_criteria_not_satisfied']

  @admin.action(description="Download Csv")
  def export_as_csv(self, request, queryset):
    model = queryset.model
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=%s.csv' % slugify(model.__name__)
    writer = csv.writer(response)
    fields= None
    # Write headers to CSV file
    if fields:
        headers = fields
    else:
        headers = []
        for field in model._meta.fields:
            headers.append(field.name)
    writer.writerow(headers)
    # Write data to CSV file
    for obj in queryset:
      row = []
      for field in headers:
          if field in headers:
              val = getattr(obj, field)
              if callable(val):
                  val = val()
              row.append(val)

      writer.writerow(row)
    # Return CSV file to browser as download
    return response

  @admin.action(description="Download criteria not-satisfied students")
  def export_criteria_not_satisfied(self, request, queryset):
    model = queryset.model
    qs = User.objects.all()
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=%s.csv' % slugify(model.__name__)
    writer = csv.writer(response)
    writer.writerow(['name', 'roll_no', 'phone_no', 'department','semester','college','criteria'])
    for rule in qs:
      print(rule)
      print(rule.roll_no)
      criteria = json.loads(rule.criteria)
      print(criteria)
      if (criteria["C"])<1 or (criteria["T"])<1 or (criteria["S"])<1:
          print(criteria)
          writer.writerow(
            [rule.name, rule.roll_no,rule.phone_no,rule.department,rule.semester,rule.college,rule.criteria])
    return response

@admin.register(UserRequest)
class UserRequestAdmin(admin.ModelAdmin):
  search_fields = ('name', 'email', 'phone_no','college')
  list_filter = ('is_approved', 'department', 'semester','college')
  list_display = ['name', 'college', 'department','semester', 'is_approved','phone_no']
  actions = ['approve_user_request']

  @admin.action(description='Approve user request')
  def approve_user_request(modeladmin, request, queryset):
    for user_request in queryset:
      user_request.is_approved = True
      user_request.save()

@admin.register(Participation)
class ParticipationAdmin(admin.ModelAdmin):
  search_fields = ('part_id', 'team_name', 'transaction__upi_transaction_id', 'transaction__transaction_id', 'members__name', 'members__roll_no', 'members__email', 'event__title')
  list_display = ['team_name', 'event','seats','day','category','amount','display_members','is_verified', 'transaction']
  list_filter = ('is_verified', 'event__title')
  actions = ['export_as_csv']

  def day(self, obj):
    return obj.event.day
  def seats(self, obj):
    return str(obj.event.seats)+"/"+str(obj.event.max_seats)
  def category(self, obj):
    return obj.event.category
  def amount(self, obj):
    return obj.event.entry_fee
  def display_members(self, obj):
    return ', '.join([str(member.roll_no) for member in obj.members.all()])
  display_members.short_description = 'Members'

  @admin.action(description="Download Csv")
  def export_as_csv(self, request, queryset):
    model = queryset.model
    qs = Participation.objects.prefetch_related(
        'members'
    )
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=%s.csv' % slugify(model.__name__)
    writer = csv.writer(response)
    writer.writerow(['timestamp', 'transaction_id', 'event', 'Team name','day', 'Members_name','Members_rollno','Members_phone_no', 'Verified','entry_fee'])
    for rule in qs:
      
        writer.writerow(["-" if rule.transaction is None else rule.transaction.timestamp,rule.transaction,rule.event.title, rule.team_name, rule.event.day
             ,','.join(str(c.name) for c in rule.members.all())
             ,','.join(str(c.roll_no) for c in rule.members.all())
             ,','.join(str(c.phone_no) for c in rule.members.all()),rule.is_verified,rule.event.entry_fee])
    return response