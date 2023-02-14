import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlace } from "../features/places/placeSlice";

function PlaceForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createPlace({ text }));
    setText("");
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Location Title</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="geo-markers">
          <label>Coordinates</label>
          <input type="text" id="geo-long" placeholder="Longitude" disabled />
          <label> X </label>
          <input type="text" id="geo-lat" placeholder="Latitude" disabled />
        </div>
        <button className="btn" type="submit">
          Add Place
        </button>
        
      </form>
    </section>
  );
}

export default PlaceForm;
