import { FormControl, FormLabel, Input, WrapItem } from "@chakra-ui/react"

export function profileData(obj) {
    return (
        Object.entries(obj).map(item => {
            if (item[0] !== 'id' && item[0] !== '__v') {
                if (typeof (item[1]) === 'string' || typeof (item[1]) === 'number') {
                    return (
                        <WrapItem w="40%">
                            <FormControl isRequired>
                                <FormLabel htmlFor={item[0]}>{item[0]}</FormLabel>
                                <Input disabled={true} id={item[0]} type={item[0]} placeholder={item[0]} defaultValue={item[1]} />
                            </FormControl>
                        </WrapItem>
                    )
                } else {
                    return Object.entries(item[1]).map(subitem => {
                        if (item[0] !== 'geolocation') {
                            return (
                                <WrapItem w="40%">
                                    <FormControl isRequired>
                                        <FormLabel htmlFor={subitem[0]}>{subitem[0]}</FormLabel>
                                        <Input
                                            disabled={true}
                                            id={subitem[0]}
                                            placeholder={subitem[0]}
                                            defaultValue={
                                                (typeof (subitem[1]) === 'string' ||
                                                    typeof (subitem[1]) === 'number'
                                                ) ? subitem[1] : ''} />
                                    </FormControl>
                                </WrapItem>
                            )
                        }
                    }
                    )
                }
            }
        }
        )
    )
}