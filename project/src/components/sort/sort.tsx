import classNames from 'classnames';
import { useState } from 'react';
import { SortType } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSort } from '../../store/action';
import { Offer } from '../../types/offers';


export default function Sort(): JSX.Element {
  const [isSortOpen, setSortState] = useState(false);
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state.sortType);
  const offers = useAppSelector((state) => state.offers);
  const location = useAppSelector((state) => state.location);
  const selectedOffers = offers.filter((offer) => offer.city.name === location);
  const changingSort = (array: Offer[], type: string) => {
    switch (type) {
      case SortType.LowPrice:
        return array.sort((a, b) => a.price - b.price);
      case SortType.HightPrice:
        return array.sort((b, a) => a.price - b.price);
      case SortType.Rating:
        return array.sort((b, a) => a.rating - b.rating);
      default:
        return array;
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={() => setSortState(!isSortOpen)}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortOpen ? 'places__options--opened' : ''}`}>
        {
          Object.entries(SortType).map(([, value]) => (
            <li
              key={value}
              className={classNames('places__option', {
                'places__option--active': value === sortType
              })}
              tabIndex={0}
              onClick={() => {
                dispatch(changeSort(value));
                changingSort(selectedOffers, sortType);
                setSortState(!isSortOpen);
              }}
            >
              {value}
            </li>
          ))
        }
      </ul>
    </form>
  );
}
