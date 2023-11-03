import { nanoid } from 'nanoid';
import { useState } from 'react';
import css from './PhoneForm.module.css';

const PhoneForm = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const newContact = { name, number, id: nanoid(5) };
    handleAddContact(newContact);
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'number') {
      setNumber(e.target.value);
    }
  };

  return (
    <form action="" className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="" className={css.lable}>
        <p className={css.titleLable}>Name</p>

        <input
          onChange={handleChange}
          name="name"
          type="text"
          className={css.input}
          value={name}
          required
        />
      </label>
      <p className={css.titleLable}>Number</p>
      <label htmlFor="" className={css.lable}>
        <input
          onChange={handleChange}
          name="number"
          type="text"
          className={css.input}
          value={number}
        />
      </label>
      <button type="submit" className={css.btnForm}>
        Add contact
      </button>
    </form>
  );
};

export default PhoneForm;
