import Subcollection from "../../../core/subcollection";

export default class extends Subcollection{
    static collection = 'submission_form_notifications'
    static parentCollection = 'notifications'
    static fields = {
        submission_form: Subcollection.resolve('../../submission-forms/submissionForms'),
        created_date: Date,
        status: String,
        status_message: String,
        user_type: String
    }
}