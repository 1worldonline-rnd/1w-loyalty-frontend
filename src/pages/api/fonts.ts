import type { NextApiRequest, NextApiResponse } from 'next';
import { axios } from '@/shared/lib/axios';

const GOOGLE_FONTS_API_KEY = 'AIzaSyDG6dcbt7qfj7hrmYOaheleV4HIAVu1NmQ';

const handler = async (_: NextApiRequest, res: NextApiResponse<google.fonts.WebfontFamily[]>) => {
    const {
        data: { items },
    } = await axios.get<google.fonts.WebfontList>(
        'https://www.googleapis.com/webfonts/v1/webfonts',
        {
            params: { key: GOOGLE_FONTS_API_KEY, sort: 'popularity' },
        }
    );

    res.status(200).json(items);
};

export default handler;
