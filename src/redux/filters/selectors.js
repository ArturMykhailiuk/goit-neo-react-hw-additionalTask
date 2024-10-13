import { selectContacts } from "../contacts/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) => {
      const name = contact.name ? contact.name.toLowerCase() : "";
      const number = contact.number ? contact.number : "";
      return (
        name.includes(normalizedFilter) || number.includes(normalizedFilter)
      );
    });
  }
);
