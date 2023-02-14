import AdminUser from "./AdminUser";

function Details() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div id="admin-userlist">
        <AdminUser name="Bob Jones" email="bobj@sheffield.council" />
        <AdminUser name="John Doe" email="johnd@gmcouncil.gov" />
        <AdminUser name="Alan Green" email="agreen@highland.eu" />
        <AdminUser name="Mary Land" email="mary889@gmcouncil.gov" />
        <AdminUser name="Alice Brown" email="brown41@lookingup.co.uk" />
        <AdminUser name="Aisha Leui" email="aisha@helpingothers.net" />
      </div>
    </div>
  );
}

export default Details;
