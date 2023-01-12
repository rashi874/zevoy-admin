import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<h1>loading</h1>}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        {
          path: 'products',
          children: [
            { path: '', element: <ProductsPage /> },
            { path: 'create', element: <CreateProduct /> },
          ],
        },
        {
          path: 'category',
          children: [
            { path: '', element: <ProductsPage /> },
            { path: 'create', element: <CreateCategory /> },
          ],
        },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

// layouts
const DashboardLayout = Loadable(lazy(() => import('./layouts/dashboard')));
const SimpleLayout = Loadable(lazy(() => import('./layouts/simple')));

const BlogPage = Loadable(lazy(() => import('./pages/BlogPage')));
const UserPage = Loadable(lazy(() => import('./pages/UserPage')));
const LoginPage = Loadable(lazy(() => import('./pages/LoginPage')));
const Page404 = Loadable(lazy(() => import('./pages/Page404')));
const ProductsPage = Loadable(lazy(() => import('./pages/products/ProductsPage')));
const CreateProduct = Loadable(lazy(() => import('./pages/products/CreateProduct')));
const CreateCategory = Loadable(lazy(() => import('./pages/category/CreateCategory')));
const DashboardAppPage = Loadable(lazy(() => import('./pages/DashboardAppPage')));
