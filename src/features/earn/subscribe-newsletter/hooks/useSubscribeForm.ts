import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { feedModel } from '@/entities/feed';
// import { showMessage } from '@/shared/lib/messages';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
});

export const useSubscribeForm = () => {
    const form = useFormik({
        initialValues: {
            email: '',
        },
        // onSubmit: async ({ email }) => {
        onSubmit: async () => {
            // const { status } = await feedModel.effects.subscribeFx({ email });

            // if (status === 200) {
            //     showMessage('Subscribed!');
            // }
        },
        validationSchema,
    });

    return { form };
};
