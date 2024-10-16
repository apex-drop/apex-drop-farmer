import { CgSpinner } from "react-icons/cg";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { lazy } from "react";

const components = new Map();

const loader = (farmer) =>
  components.get(farmer) ||
  components
    .set(
      farmer,
      lazy(() => import(`@/drops/${farmer.toLowerCase()}/${farmer}.jsx`))
    )
    .get(farmer);

const fallbackRender = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 p-4 grow"
    >
      <h4 className="text-3xl">Oops</h4>
      <p className="font-bold text-center text-neutral-500">
        Something went wrong
      </p>
      <button
        onClick={resetErrorBoundary}
        className="w-full max-w-xs px-4 py-2 text-white bg-black rounded-lg"
      >
        Reset
      </button>
    </div>
  );
};
export default function Farmer({ farmer, ...props }) {
  const Component = loader(farmer);

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center grow">
            <CgSpinner className="w-5 h-5 mx-auto animate-spin" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
