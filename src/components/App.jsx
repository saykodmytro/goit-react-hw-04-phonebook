import { useEffect, useState } from 'react';
import { ContactList } from './ContactList/ContactList';

import { Container } from './Container/Container';
import { Filter } from './Filter/Filter';
import PhoneForm from './PhoneForm/PhoneForm';

import { contactsData } from 'Utils/contactsData';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? contactsData;
    return parsedContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    const hasDuplicates = contacts.some(
      contact => contact.name === newContact.name
    );
    if (hasDuplicates) {
      return alert(
        `Oops, product with title '${newContact.name}' already exist!`
      );
    }
    setContacts([newContact, ...contacts]);
  };

  const handleDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handlerFilter = () => {
    let searchContact = [];
    if (filter) {
      searchContact = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      searchContact = contacts;
    }
    return searchContact;
  };

  return (
    <>
      <Container title="Phonebook">
        <PhoneForm handleAddContact={handleAddContact} />
      </Container>
      <Container title="Search">
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </Container>

      <Container title="Contacts">
        <ContactList contacts={handlerFilter()} handleDelete={handleDelete} />
      </Container>
    </>
  );
};
