# Meeting App

>"Power Up Your Meetings with Frappe's Meeting App!"

Are your meetings feeling mundane and unproductive? Say hello to a game-changer in the world of meeting management! Join us as we create a dynamic and innovative Meeting app with Frappe Framework. From seamless invitations to effortless minute-taking, this app will revolutionize the way you meet. Get ready to elevate your meetings to a whole new level!


## Installation

- We assume that you have already installed frappe bench.
- Create an app named Meeting
```bash
$ bench new-app meeting
```
- Create a site named meeting.com and make it point to localhost. 
```bash
$ bench new-site meeting.com
$ bench --site meeting.com add-to-hosts
```
- Install app on site:
```bash
$ bench --site meeting.com install-app meeting
$ cd sites/
$ bench use meeting.com/
$ bench start
```

## Making App

- To create DocTypes in our app, we must log in to Desk. Go to http://meeting.com:8000 and it should show you a login page. Enter Administrator as the user and password that you set while creating the site.
- Create a doctype named `Meeting Agenda` in `Meeting module` and add fields as shown below:
    - Is Child Table: Enabled
    - Description Field: Type - Text Editor, Mandatory, In List View
      
![image](https://github.com/Diya050/meeting/assets/124448340/d09b88e7-bc22-46c6-8296-340529bb7c30)

- Create another doctype named `Meeting Attendee` in `Meeting` module and add fields as shown below:
    - Attendee, Field Type - Link (Linked to User), Mandatory
    - Full Name, Field Type - Data
    - Invitation Accepted?, Field Type - Check
    - Attended?, Field Type - Check
 
  ![image](https://github.com/Diya050/meeting/assets/124448340/7786a2aa-7cf4-4783-8e3c-92ce303996bf)

- Create another doctype named `Meeting Minute` in `Meeting` module and add fields as shown below:
    - Is Child Table: Enabled
    - Description, Field Type - Text Editor, Mandatory, In Grid View
    - Action, Field Type - Data
    - Status, Field Type - Select (Options: Open/Closed)
    - Assigned To, Field Type - Link (Linked to User)
    - Complete By, Field Type - Date
    - ToDo, Field Type - Link (Linked to ToDo)
 
  ![image](https://github.com/Diya050/meeting/assets/124448340/713c2871-2c16-4ae6-bd43-ad0b7a00caad)

- Create our main doctype named `Meeting` in `Meeting` module and add fields as shown below:
    - Title, Field Type - Data
    - Status, Field Type - Select (Options: Planned, Invitation Sent, In Progress, Completed, Cancelled)
    - Show in Website, Field Type - Check
    - Page Name, Field Type - Data
    - Parent Website Route, Field Type - Data
    - Date, Field Type - Date
    - From Time, Field Type - Time
    - To Time, Field Type - Time
    - Agenda, Field: Section Break, Collapsible Section
    - Agenda (Table ---> Meeting Agenda)
    - Attendees, Field: Section Break, Collapsible Section
    - Attendees (Table ---> Meeting Attendee)
    - Invitation, Field: Section Break, Collapsible Section
    - Invitation Message (Text Editor)
    - Send Emails (Button)
    - Minutes, Field: Section Break, Collapsible Section
    - Minutes (Table ---> Meeting Minute)

`Naming Rule:` Expression (Old Style)

`Auto Name:` Meeting-.#

`In View Settings,`
Title Field: title

In Permission Rules,
   - Meeting Manager (Read, Write, Create, Delete)
   - Meeting Attendee (Read, Write, Create)
    
- With this we are done with our work on Frappe desk.
- Now we will create apps/meeting/meeting/templates/generators/meeting.html to style our webpage for each meeting created: [meeting.html](meeting.html)

`Output`:
![image](https://github.com/Diya050/meeting/assets/124448340/d3d4967e-6269-451a-9ba3-c1263d84b06f)

- Now we will edit meeting/meeting/doctype/meeting/meeting.py for generating website pages for meetings, and handling attendee information, ToDos, and other related functionalities:

```python
# meeting.py

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.website.website_generator import WebsiteGenerator

class Meeting(WebsiteGenerator):
    # The Meeting class is a WebsiteGenerator, which means it generates website pages using a specific template.
    
    website = frappe._dict(
        template = "templates/generators/meeting.html"
    )

    def validate(self):
        # This method is called before saving the document and is used for validation purposes.
        
        # Set the page_name attribute to the lowercased name of the meeting.
        self.page_name = self.name.lower()
        
        # Call the validate_attendees method to ensure attendees have valid full names and check for duplicates.
        self.validate_attendees()

    def on_update(self):
        # This method is triggered after the document is saved.
        
        # Sync ToDos for assignments and call the send_minutes method (which seems to be commented out).
        self.sync_todos()
        #	self.send_minutes()

    def validate_attendees(self):
        """Set missing names and warn if duplicate"""
        # This method ensures that each attendee in the meeting has a valid full name set and checks for duplicate attendees.
        
        found = []
        for attendee in self.attendees:
            if not attendee.full_name:
                # If the full name is missing, fetch the full name of the attendee using the get_full_name function.
                attendee.full_name = get_full_name(attendee.attendee)

            if attendee.attendee in found:
                # If the attendee is found in the 'found' list, raise an error for duplicate attendee.
                frappe.throw(_("Attendee {0} entered twice").format(attendee.attendee))

            # Add the attendee to the 'found' list.
            found.append(attendee.attendee)

    def sync_todos(self):
        """Sync ToDos for assignments"""
        # This method synchronizes ToDos for assignments based on the minutes of the meeting.
        
        # Get the names of existing ToDos associated with this meeting.
        todos_added = [todo.name for todo in
                       frappe.get_all("ToDo",
                                      filters={
                                          "reference_type": self.doctype,
                                          "reference_name": self.name,
                                          "assigned_by": ""
                                      })
                       ]

        for minute in self.minutes:
            if minute.assigned_to and minute.status=="Open":
                # If the minute has an assigned user and is open, create a ToDo if it doesn't exist.
                if not minute.todo:
                    todo = frappe.get_doc({
                        "doctype": "ToDo",
                        "description": minute.description,
                        "reference_type": self.doctype,
                        "reference_name": self.name,
                        "owner": minute.assigned_to
                    })
                    todo.insert()

                    # Link the ToDo to the minute.
                    minute.db_set("todo", todo.name, update_modified=False)

                else:
                    # If the minute has an existing ToDo, remove it from the 'todos_added' list.
                    todos_added.remove(minute.todo)

            else:
                # If the minute is unassigned or has a status other than "Open," remove the associated ToDo.
                minute.db_set("todo", None, update_modified=False)

        for todo in todos_added:
            # Remove closed or old todos that are not associated with any minutes anymore.
            todo = frappe.get_doc("ToDo", todo)
            todo.flags.from_meeting = True
            todo.delete()

    def get_context(self, context):
        # This method is used to set the context for rendering the website page.

        # Set the 'parents' context variable to create a breadcrumb navigation link to the "Meetings" page.
        context.parents = [{"name": "meetings", "title": "Meetings"}]

@frappe.whitelist()
def get_full_name(attendee):
    # This function is a whitelisted function that retrieves the full name of a user based on the provided 'attendee' parameter.
    
    # Fetch the User document corresponding to the attendee.
    user = frappe.get_doc("User", attendee)

    # Concatenate the first name, middle name, and last name of the user (if available) and return the full name.
    return " ".join(filter(None, [user.first_name, user.middle_name, user.last_name]))

```

- Now we will edit meeting/meeting/doctype/meeting/meeting.js to create API calls to send emails and minutes, as well as how the full name of the attendee is fetched and set in the Meeting Attendee doctype:

```javascript
// meeting.js

// Function to handle the "send_emails" custom button click on the Meeting doctype form
frappe.ui.form.on("Meeting", {
    send_emails: function(frm) {
        // Check if the document is new (not yet saved)
        if(frm.doc.__islocal) {
            // Display a message asking the user to save before sending emails
            msgprint(__("Please save before Sending."));
            throw "Sending error";
        } else {
            // If the document is saved and its status is "Planned," send invitation emails
            if (frm.doc.status === "Planned") {
                frappe.call({
                    method: "meeting.api.send_invitation_emails",
                    args: {
                        meeting: frm.doc.name
                    },
                    callback: function(r) {
                        frm.clear_custom_buttons(); // Clear custom buttons after sending emails
                        frm.refresh(); // Refresh the form
                    }
                });
            }
        }
    },

    // Function to handle the "send_minutes" custom button click on the Meeting doctype form
    send_minutes: function(frm) {
        // Check if the document is new (not yet saved)
        if(frm.doc.__islocal) {
            // Display a message asking the user to save before sending minutes
            msgprint(__("Please save before Sending."));
            throw "Sending error";
        } else {
            // If the document is saved and its status is "In Progress," send meeting minutes
            if (frm.doc.status === "In Progress") {
                frappe.call({
                    method: "meeting.api.send_minutes",
                    args: {
                        meeting: frm.doc.name
                    }
                });
            }
        }
    }
});

// Event handler for the Meeting Attendee doctype
frappe.ui.form.on("Meeting Attendee", {
    attendee: function(frm, cdt, cdn) {
        var attendee = frappe.model.get_doc(cdt, cdn);
        if (attendee.attendee) {
            // If attendee is selected, get the full name of the attendee
            frappe.call({
                method: "meeting.meeting.doctype.meeting.meeting.get_full_name",
                args: {
                    attendee: attendee.attendee
                },
                callback: function(r) {
                    frappe.model.set_value(cdt, cdn, "full_name", r.message); // Set the full name in the field
                }
            });
        } else {
            // If no attendee is selected, clear the full name field
            frappe.model.set_value(cdt, cdn, "full_name", null);
        }
    },
});
```

- Lets create meeting/meeting/doctype/meeting/meeting_list.js to add colour badges for different statuses of meetings in list view:

```javascript
frappe.listview_settings['Meeting'] = {
	add_fields: ["status"],
	get_indicator: function(doc) {
		return [__(doc.status), {
			"Planned": "blue",
			"Invitation Sent": "orange",
			"In Progress": "red",
			"Completed": "green",
			"Cancelled": "darkgrey"
		}[doc.status], "status,=," + doc.status];
	}
};
```

`Output:`
![image](https://github.com/Diya050/meeting/assets/124448340/b437adbb-6ebc-43c5-be32-d967bbef7f3f)

- Now lets create meeting/api.py to respond to the api calls we created in meeting.py. Also, in this we have added a function to create an orientation meeting when a new User is added:

```python
# api.py

import frappe
from frappe import _
from frappe.utils import get_fullname, get_link_to_form
from frappe.utils import nowdate, add_days

# Function to send invitation emails for a meeting
@frappe.whitelist()
def send_invitation_emails(meeting):
	# Fetch the Meeting document using the provided meeting name
	meeting = frappe.get_doc("Meeting", meeting)
	
	# Get the sender's full name
	sender_fullname = get_fullname(frappe.session.user)

	if meeting.status == "Planned":
		if meeting.attendees:
			# Prepare the email content using a template and send it to all attendees
			message = frappe.get_template("templates/emails/meeting_invitation.html").render({
				"sender":sender_fullname,
				"date":meeting.date,
				"from_time":meeting.from_time,
				"to_time":meeting.to_time,
				"invitation_message":meeting.invitation_message,
				"agenda": meeting.agenda,
			})
			frappe.sendmail(
				recipients=[d.attendee for d in meeting.attendees],
				sender=frappe.session.user,
				subject="New Meeting:" + meeting.title,
				message=message,
				reference_doctype=meeting.doctype,
				reference_name=meeting.name,
			)

			# Update the meeting status to "Invitation Sent" and save the document
			meeting.status = "Invitation Sent"
			meeting.save()
			frappe.msgprint(_("Invitation Sent"))
		else:
			frappe.msgprint("Enter at least one Attendee for Sending")
	else:
		frappe.msgprint(_("Meeting Status must be 'Planned'"))

# Function to send meeting minutes
@frappe.whitelist()
def send_minutes(meeting):
	# Fetch the Meeting document using the provided meeting name
	meeting = frappe.get_doc("Meeting", meeting)
	
	# Get the sender's full name
	sender_fullname = get_fullname(frappe.session.user)
	
	if meeting.status == "Invitation Sent":
		if meeting.minutes:
			# Prepare the email content for each minute and send it to the assigned users
			for d in meeting.minutes:
				message = frappe.get_template("templates/emails/minute_notification.html").render({
					"sender":sender_fullname,
					"action": d.action,
					"description": d.description,
					"complete_by":d.complete_by
				})
				frappe.sendmail(
					recipients=d.assigned_to,
					sender=frappe.session.user,
					subject=meeting.title,
					message=message,
					reference_doctype=meeting.doctype,
					reference_name=meeting.name,
				)

			# Update the meeting status to "In Progress" and save the document
			meeting.status = "In Progress"
			meeting.save()
			frappe.msgprint(_("Minutes Sent"))
		else:
			frappe.msgprint("Enter at least one Minute for Sending")
	else:
		frappe.msgprint(_("Meeting Status must be 'Invitation Sent'"))

# Function to fetch meetings within a specified date range
@frappe.whitelist()
def get_meetings(start, end):
	if not frappe.has_permission("Meeting", "read"):
		raise frappe.PermissionError

	return frappe.db.sql("""select
		timestamp(`date`, from_time) as start,
		timestamp(`date`, to_time) as end,
		name,
		title,
		status,
		0 as all_day
	from `tabMeeting`
	where `date` between %(start)s and %(end)s""", {
		"start": start,
		"end": end
	}, as_dict=True)

# Function to create an orientation meeting when a new User is added
def make_orientation_meeting(doc, method):
	meeting = frappe.get_doc({
		"doctype": "Meeting",
		"title": "Orientation for {0}".format(doc.first_name),
		"date": add_days(nowdate(), 1),
		"from_time": "09:00",
		"to_time": "09:30",
		"status": "Planned",
		"attendees": [{
			"attendee": doc.name
		}]
	})
	# The System Manager might not have permission to create a Meeting, so ignore permissions
	meeting.flags.ignore_permissions = True
	meeting.insert()

	frappe.msgprint(_("Orientation meeting created"))

# Function to update minute status to "Closed" if ToDo is closed or deleted
def update_minute_status(doc, method=None):
	# Only proceed if the document is related to a Meeting and not triggered from a Meeting document
	if doc.reference_type != "Meeting" or doc.flags.from_meeting:
		return

	if method == "on_trash" or doc.status == "Closed":
		# Fetch the Meeting document related to the ToDo and update its corresponding minute status
		meeting = frappe.get_doc(doc.reference_type, doc.reference_name)
		for minute in meeting.minutes:
			if minute.todo == doc.name:
				minute.db_set("todo", None, update_modified=False)
				minute.db_set("status", "Closed", update_modified=False)
```
- Now create meeting/templates/emails/meeting_invitation.html to style our invitatio mail to be sent: [meeting_invitation.html](meeting_invitation.html)

`Output:`

![image](https://github.com/Diya050/meeting/assets/124448340/33cb64c3-e8c3-4ac4-a616-3bfef2e36014)

- Now to make our app's home page, we will create meeting/www/meetings.html: [meetings.html](meetings.html)

`Output:`
![image](https://github.com/Diya050/meeting/assets/124448340/c4187d94-48c5-46cf-9941-fa8590e679a4)

- Create meeting/www/meetings.css:

```css
.meetings-list li {
	margin: 15px 0px;
}
```
- Create meeting/www/meetings.py to fetch meetings for meetings.html:

```python
# meetings.py

import frappe

# Function to get context for rendering the website page
def get_context(context):
	# Get planned meetings and assign them to the 'planned_meetings' variable
	context.planned_meetings = get_meetings("Planned")

	# Show only 20 past meetings and assign them to the 'past_meetings' variable
	context.past_meetings = get_meetings("Completed", limit_page_length=20)

# Function to get meetings based on the status and additional filters
def get_meetings(status, **kwargs):
	# Get all meetings with specific fields and filters based on the status and additional kwargs
	return frappe.get_all("Meeting",
		fields=["name", "title", "date", "from_time", "to_time", "page_name"],
		filters={"status": status, "show_in_website": 1},
		order_by="date desc", **kwargs)

```

- Finally edit meeting/hooks.py to add foolwing to connect our functions over the app:

```python
# List of website generators
website_generators = ["Meeting"]
# This list specifies the doctypes for which website pages need to be generated using templates.

# Document Events
doc_events = {
    # Document events are used to trigger custom functions when specific events occur on certain doctypes.

    # For the "User" doctype, execute the "make_orientation_meeting" function after a new user is inserted.
    "User": {
        "after_insert": "meeting.api.make_orientation_meeting"
    },

    # For the "ToDo" doctype, execute the "update_minute_status" function on update and on trash (when ToDo is deleted).
    "ToDo": {
        "on_update": "meeting.api.update_minute_status",
        "on_trash": "meeting.api.update_minute_status"
    }
}

```

- Now your Meeting app is ready you can host it and add various users/attendees to have a successfull meeting. 
