
import { Image, Box, Center } from '@mantine/core';
import errorImage from './404.webp'

function Error() {
    return (
        <Center>
             <Image
            src={errorImage}
            alt='Description'
            height={250}
            width={250}
        />
        </Center>
    )
}

export default Error;