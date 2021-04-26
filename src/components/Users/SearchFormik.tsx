import React from 'react';
import { Formik, Field, Form } from "formik"
import { useSelector } from 'react-redux'
import { getSearchForm } from '../../redux/users-selectors'
import { FilterType } from '../../redux/users-reduser';

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: FriendFormType

}

type FriendFormType = 'true' | 'false' | 'null'

const userValidate = (values: any) => {
    const errors = {}
    return errors
}
const SearchFormick: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getSearchForm)
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{  term: filter.term, friend: String(filter.friend) as FriendFormType }}
            validate={userValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
            </button>
                </Form>
            )}
        </Formik>
    )
})
export default SearchFormick