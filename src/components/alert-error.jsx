
export default function AlertError({ message }) {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="alert alert-danger">
          <strong>Error:</strong> {message}
        </div>
      </div>
    </div>
  );
}