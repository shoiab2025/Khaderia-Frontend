import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './layouts/loader/Loader';
import { Toaster } from 'react-hot-toast';
import FullLayout from './layouts/FullLayout';
import StudentFullLayout from './layouts/StudentFullLayout';
import Starter from './views/Starter';
import Groups from './components/groups/Groups';
import Home from './components/students-view/Home';
import Login from './login/Login';
import SignUp from './signup/SignUp';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthRedirect from './routes/AuthRedirect';
import { useAuthcontext } from './contexts/Authcontext';
import CourseList from './components/students-view/course/CourseList';
import CourseDetails from './components/students-view/course/course-details';
import StudentCourseList from './components/students-view/course/StudentCourseList';
import CourseForm from './components/instructor/course/CourseForm';
import InstructorCourseList from './components/instructor/course/CourseList';
import GroupList from './components/instructor/group/GroupList';
import GroupForm from './components/instructor/group/GroupForm';
import ExploreDetails from './components/students-view/course/ExploreDetails';
import UnitsPage from './components/students-view/course/unitsPage';
import MaterialPage from './components/students-view/course/materialPage';
import TestOverview from './views/ui/Test';
import TestFormReact from './views/ui/TestForm';
import UserList from './views/ui/UserList'
import ApprovalList from './views/ui/ApprovalList'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faBan, faTrophy } from '@fortawesome/free-solid-svg-icons';
import TestEditForm from './views/ui/TestEditForm';



const App = () => {
  const { authUser } = useAuthcontext();
  library.add(faEdit, faTrash, faBan, faTrophy);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Instructor routes */}
        <Route
          path='/instructor'
          element={
            <ProtectedRoute condition={authUser && authUser.user.isAdmin} redirectTo="/login">
              <FullLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/instructor" element={<Navigate to="/instructor/courses" />} />
          <Route path="/instructor/starter" element={<Starter />} />
          <Route path="/instructor/groups" element={<GroupList />} />
          <Route path="/instructor/create-group" element={<GroupForm />} />
          <Route path="/instructor/edit-group/:id" element={<GroupForm />} />
          <Route path="/instructor/courses" element={<InstructorCourseList />} />
          <Route path="/instructor/create-course" element={<CourseForm />} />
          <Route path="/instructor/edit-course/:courseId" element={<CourseForm />} />
          <Route path="/instructor/test/" element={<TestOverview />} />
          <Route path="/instructor/test/new" element={<TestFormReact />} />
          <Route path="/instructor/test/:id" element={<TestFormReact />} />
          <Route path="/instructor/users" element={<UserList />} />
          <Route path="/instructor/approvals" element={<ApprovalList />} />
        </Route>

        {/* Home route for regular users */}
        <Route
          path='/'
          element={
            <FullLayout />
          }
        >
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/student-courses" element={<StudentCourseList />} />
          <Route path="/course/details/:id" element={<CourseDetails />} />
          <Route path="/course/explore-details/:id" element={<ExploreDetails />} />
          <Route path="/course/units/:id" element={<UnitsPage />} />
          <Route path="/course/materials/:id" element={<MaterialPage />} />

          <Route path="/home" element={<Home />} />
        </Route>

        {/* Login route */}
        <Route
          path='/login'
          element={
            authUser ? (
              authUser.user.isAdmin ? (
                <Navigate to="/instructor" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />

        {/* Signup route, accessible even if not authenticated */}
        <Route path='/signup' element={authUser ? (
              authUser.user.isAdmin ? (
                <Navigate to="/instructor" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <SignUp />
            )} />

        {/* Catch-all route */}
        <Route
          path='*'
          element={
            <AuthRedirect authUser={authUser} adminPath="/instructor" userPath="/" />
          }
        />
      </Routes>
      <Toaster />
    </Suspense>
  );
};

export default App;
