import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError();
  let title = 'Unexpected Application Error';
  let message = 'Something went wrong.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = (error.data as any)?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="container-responsive py-10">
      <div className="mx-auto max-w-xl rounded border p-6 text-center">
        <h1 className="mb-2 text-xl font-semibold">{title}</h1>
        <p className="mb-4 text-sm text-red-600">{message}</p>
        <Link to="/" className="rounded bg-blue-600 px-4 py-2 text-white">Go Home</Link>
      </div>
    </div>
  );
}


