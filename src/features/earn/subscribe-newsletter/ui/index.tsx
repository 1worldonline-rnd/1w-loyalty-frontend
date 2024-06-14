import styled from 'styled-components';
import Button from 'rsuite/Button';
import Input from 'rsuite/Input';
import { useSubscribeForm } from '../hooks/useSubscribeForm';
import { styles } from './styles';
import { ErrorMessage, Loader } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';

export const SubscribeNewsletterForm = styled(({ className }: PropsWithClassName) => {
    const { form: f } = useSubscribeForm();

    return (
        <form className={className} onSubmit={f.handleSubmit}>
            <h3>Subscribe to the weekly newsletter</h3>

            <div className="email-container">
                <Input
                    data-error={Boolean(f.touched.email) && Boolean(f.errors.email)}
                    className="input"
                    size="lg"
                    type="email"
                    placeholder="Enter your email address"
                    {...f.getFieldProps('email')}
                    onChange={(newValue: string) => f.setFieldValue('email', newValue)}
                />

                <span className="email-count">+100</span>

                {f.touched.email && f.errors.email && <ErrorMessage>{f.errors.email}</ErrorMessage>}
            </div>

            <Button size="lg" appearance="primary" type="submit" disabled={f.isSubmitting}>
                {f.isSubmitting ? <Loader /> : 'Join'}
            </Button>
        </form>
    );
})`
    ${styles}
`;
