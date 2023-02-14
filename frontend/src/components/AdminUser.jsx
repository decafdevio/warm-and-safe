export default function AdminUser(props) {
  return (
    <div>
      {props.name} - <strong>{props.email}</strong>
      <span className="admin-user-ctl">
        <button>Update</button>
        <button>Delete</button>
      </span>
    </div>
  );
}
