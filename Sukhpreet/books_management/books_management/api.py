import frappe

@frappe.whitelist(allow_guest=True)  
def user_role():
    user = frappe.session.user
    roles = frappe.get_roles(user)
    return {"is_librarian": "Librarian" in roles}
