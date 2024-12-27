import frappe

@frappe.whitelist()
def user_role():
    user = frappe.session.user
    roles = frappe.get_roles(user)
    return {"role": "Librarian" if "Librarian" in roles else "Member"}
