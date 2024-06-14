import Image from 'next/image';

type LogotypeWithoutTextProps = {
    width?: number;
};

export const LogotypeWithoutText = ({ width = 61 }: LogotypeWithoutTextProps) => (
    <Image
        src="/loyalty/images/logotype-without-text.svg"
        alt="1World Online"
        width={width}
        height={Math.round(width * 35 / 61)}
    />
);
