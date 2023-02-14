import Hours from "./Hours";

export default function AddForm(props) {
  //   let coords = `${props.lat} + "/" + ${props.lng}`;
  return (
    <article className="formhere">
      <form>
        <input
          type="text"
          id="latlong"
          name="latlong"
          placeholder="Longitude"
          disabled
        />
        <br />
        <input
          type="text"
          id="latlong"
          name="latlong"
          placeholder="Latitude"
          disabled
        />
        <br />
        <br />

        <label htmlFor="pname">Location name:</label>
        <br />
        <input
          type="text"
          id="pname"
          name="pname"
          placeholder="Enter location"
        />

        <br />
        <br />

        <label htmlFor="paddress">Location address:</label>
        <br />
        <input
          type="text"
          id="paddress"
          name="paddress"
          placeholder="Enter address"
        />

        <br />
        <br />

        <section className="facil-checks">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facHeating"
              checked
              disabled
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facHeating">
              <strong>Heating</strong>
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facShelter"
              checked
              disabled
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              <strong>Shelter</strong>
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facSeating"
              checked
              disabled
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facSeating">
              <strong>Seating</strong>
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="facFood" />
            &nbsp;
            <label className="form-check-label" htmlFor="facFood">
              Sells food or drink
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="facToys" />
            &nbsp;
            <label className="form-check-label" htmlFor="facToys">
              Children's toys available
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="facEnts" />
            &nbsp;
            <label className="form-check-label" htmlFor="facEnts">
              Entertainment, e.g., radio or magazines
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="facWifi" />
            &nbsp;
            <label className="form-check-label" htmlFor="facWifi">
              Free or paid Wi-Fi.
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facToilets"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facToilets">
              Public toilets
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="facMobility"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facMobility">
              Level-access for wheelchair users
            </label>
          </div>
        </section>
        <br />
        <Hours />
        <br />
        <label htmlFor="username">Verified by:</label>
        <input
          type="text"
          id="username"
          name="username"
          disabled
          placeholder="{user.name}"
        />
        <br />
        <br />
        <section className="form-buttons" style={{ display: "flex" }}>
          <input
            type="button"
            value="Create a place"
            className="btn"
            id="btn-create"
          />
          <input type="button" value="Update place" className="btn" />
          <input
            type="button"
            value="Delete this place"
            className="btn"
            id="btn-delete"
          />
        </section>
      </form>
    </article>
  );
}
