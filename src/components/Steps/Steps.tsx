import styles from './steps.module.css';
import React, { useRef, useState } from 'react';

interface DistItem {
  id: number;
  date: string;
  distance: number;
}

const Steps = () => {

  const idNum = useRef<number>(4);

  const [items, setItems] = useState<DistItem[]>([
    { id: 0, date: '22-12-2022', distance: 21 },
    { id: 1, date: '03-01-2023', distance: 21 },
    { id: 2, date: '05-11-1911', distance: 231 },
    { id: 3, date: '04-04-2014', distance: 2 },
  ]);

  const [form, setForm] = useState({
    date: '',
    distance: '',
  });

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((el) => el.id !== id));
    setForm({ date: '', distance: '' });
  }
console.log(1)
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.date !== '' && form.distance !== '') {

      const dateExist = items.findIndex(el => el.date === form.date);
      if (dateExist > -1) {
        setItems((prev) => [...(prev.map(el => {
          if (el.date === form.date) {
            el.distance = Number(el.distance) + Number(form.distance);
          }
          return el;
        }))]);
      } else {
        setItems((prev) => [...prev, { id: idNum.current, date: form.date, distance: Number(form.distance) }]);
      }
      idNum.current++;
      setForm({ date: '', distance: '' });
    }
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    const { name } = e.target;
    if (name === 'date') {
      value = value.split('-').reverse().join('-');
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  items.sort((a: DistItem, b: DistItem) => new Date(a.date.split('-').reverse().join('-')) < new Date(b.date.split('-').reverse().join('-')) ? -1:1);

  return (
    <>
      <form className={styles['form-cont']} onSubmit={handleAddItem}>
        <div className={styles['form-date']}>
          <header className={styles['form-item__header']}>
            Дата (ДД.ММ.ГГГГ)
          </header>
          <input type="date" name='date' value={form.date.split('-').reverse().join('-')} onChange={handleChangeValue} />
        </div>
        <div className={styles['form-distance']}>
          <header className={styles['form-item__header']}>
            Пройдено км
          </header>
          <input type='number' name='distance' value={form.distance} onChange={handleChangeValue} placeholder='Расстояние' />
        </div>
        <div className={styles['form-btn']}>
          <button type='submit'>OK</button>
        </div>
      </form>
      <div className={styles['list-cont']}>
        <header className={styles['list-header']}>
          <div className={styles['list-header__item']}>Дата (ДД.ММ.ГГГГ)</div>
          <div className={styles['list-header__item']}>Пройдено км</div>
          <div className={styles['list-header__item']}>Действия</div>
        </header>
        <div className={styles['list-body']}>
          {items.map((el) => (
            <div className={styles['list-body__el']} key={el.id}>
              <div className={styles['list-body__el__item']}>
                {el.date}
              </div>
              <div className={styles['list-body__el__item']}>
                {el.distance}
              </div>
              <div className={styles['list-body__el__item']}>
                <button type='button' title='Изменить'>&#9998;</button>
                <button type='button' title='Удалить' onClick={() => handleRemoveItem(el.id)}>&#10060;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Steps

/*
    
*/