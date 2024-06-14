import { $uploadedQuizzes } from './stores';
import { uploadFileWithQuizzesFx } from './effects';

$uploadedQuizzes.on(uploadFileWithQuizzesFx.doneData, (_, { data }) => data);
