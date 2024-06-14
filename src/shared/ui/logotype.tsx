import Image from 'next/image';

type LogotypeProps = {
    width?: number;
};

export const Logotype = ({ width = 180 }: LogotypeProps) => (
    <Image
        src="/loyalty/images/logotype.svg"
        alt="1World Online"
        width={width}
        height={Math.round((width * 7) / 36)}
    />
);
