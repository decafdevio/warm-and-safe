import "../App.css";

export default function Hours(props) {
  return (
    <table id="table-hours">
      <tbody>
        <tr>
          <th>Days</th>
          <th>Open</th>
          <th>Close</th>
        </tr>
        <tr>
          <td>Monday</td>
          <td>
            <input
              onChange={() => props.setTimes.monFrom(this.value)}
              type="time"
              id="mon-from"
              name="mon-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.monTo(this.value)}
              type="time"
              id="mon-to"
              name="mon-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="monClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>
            <input
              onChange={() => props.setTimes.tueFrom(this.value)}
              type="time"
              id="tues-from"
              name="tues-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.tueTo(this.value)}
              type="time"
              id="tuse-to"
              name="tues-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="tueClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>
            <input
              onChange={() => props.setTimes.wedFrom(this.value)}
              type="time"
              id="weds-from"
              name="weds-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.wedTo(this.value)}
              type="time"
              id="weds-to"
              name="weds-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="wedClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>
            <input
              onChange={() => props.setTimes.thuFrom(this.value)}
              type="time"
              id="thurs-from"
              name="thurs-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.thuTo(this.value)}
              type="time"
              id="thurs-to"
              name="thurs-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="thuClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>
            <input
              onChange={() => props.setTimes.friFrom(this.value)}
              type="time"
              id="fri-from"
              name="fri-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.friTo(this.value)}
              type="time"
              id="fri-to"
              name="fri-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="friClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td>
            <input
              onChange={() => props.setTimes.satFrom(this.value)}
              type="time"
              id="sat-from"
              name="sat-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.satTo(this.value)}
              type="time"
              id="sat-to"
              name="sat-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="satClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
        <tr>
          <td>Sunday</td>
          <td>
            <input
              onChange={() => props.setTimes.sunFrom(this.value)}
              type="time"
              id="sun-from"
              name="sun-from"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="00:00"
            />{" "}
          </td>
          <td>
            <input
              onChange={() => props.setTimes.sunTo(this.value)}
              type="time"
              id="sun-to"
              name="sun-to"
              min="00:01"
              max="23:59"
              size="5"
              placeholder="23:59"
            />
          </td>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              id="sunClosed"
            />
            &nbsp;
            <label className="form-check-label" htmlFor="facShelter">
              Closed
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
