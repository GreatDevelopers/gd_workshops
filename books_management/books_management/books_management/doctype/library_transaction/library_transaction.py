# Copyright (c) 2024, Sukhpreet Singh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.model.docstatus import DocStatus


class LibraryTransaction(Document):
    def before_submit(self):
        if self.type == "Issue":
            self.validate_issue()
            # Set the book status to "Issued"
            book = frappe.get_doc("Book", self.book)
            book.status = "Issued"
            book.save()

        elif self.type == "Return":
            self.validate_return()
            # Set the book status to "Available"
            book = frappe.get_doc("Book", self.book)
            book.status = "Available"
            book.save()

    def validate_issue(self):
        self.validate_membership()
        book = frappe.get_doc("Book", self.book)
        # Book cannot be issued if it is already issued
        if book.status == "Issued":
            frappe.throw("Book is already issued to another member")

    def validate_return(self):
        book = frappe.get_doc("Book", self.book)
        # Book cannot be returned if it was not issued first
        if book.status == "Available":
            frappe.throw("Book cannot be returned without being issued first")

    def validate_membership(self):
        # Check if a valid membership exists for this library member
        valid_membership = frappe.db.exists(
            "Library Membership",
            {
                "library_member": self.library_member,
                "docstatus": DocStatus.submitted(),
                "from_date": ("<", self.date),
                "to_date": (">", self.date),
            },
        )
        if not valid_membership:
            frappe.throw("The member does not have a valid membership")
