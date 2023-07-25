// Import necessary modules from Next.js, React, and react-hook-form
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

//exited with code=1 error happens when running

// Import user service and alert service from 'services' (not shown in this code snippet)
import { userService, alertService } from 'services';

// Export the AddEdit component as a named export
export { AddEdit };

// AddEdit component is a functional component that receives 'props' as an argument
function AddEdit(props) {
    // Extract the 'user' prop from 'props' using destructuring and use Optional Chaining (?.) to handle undefined 'props'
    const user = props?.user;
    // Access the Next.js router using the useRouter() hook
    const router = useRouter();

    // Form validation rules defined using Yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // Password is optional in edit mode, but required in add mode
            .concat(user ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
    });

    // Options for react-hook-form to use Yup validation
    const formOptions = { resolver: yupResolver(validationSchema) };

    // If the component is in edit mode, set default form values using 'user' prop
    if (user) {
        formOptions.defaultValues = props.user;
    }

    // Get functions to build the form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    // Function to handle form submission
    async function onSubmit(data) {
        // Clear any existing alerts from the alert service
        alertService.clear();
        try {
            // Create or update user based on the 'user' prop
            let message;
            if (user) {
                await userService.update(user.id, data);
                message = 'User updated';
            } else {
                await userService.register(data);
                message = 'User added';
            }

            // Redirect to user list with success message after successful form submission
            router.push('/users');
            alertService.success(message, true);
        } catch (error) {
            // Display error message using the alert service if there's an error during form submission
            alertService.error(error);
            console.error(error);
        }
    }

    // The return statement defines the form structure and inputs for the AddEdit component
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">First Name</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Last Name</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Username</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">
                        Password
                        {user && <em className="ms-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
            </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/users" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}
