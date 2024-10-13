import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <label className={css.labelFind}>
      Find contacts by (name\number)
      <input
        type="text"
        value={filter}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        className={css.inputFind}
      />
    </label>
  );
};

export default SearchBox;
