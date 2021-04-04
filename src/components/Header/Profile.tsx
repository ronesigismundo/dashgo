import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface IProfileProps {
  showProfileData?: boolean; 
}

export function Profile({showProfileData= true}:IProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Rone Sigismundo</Text>
          <Text color="gray-300" fontSize="small">
            rone_sigismundo@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Rone Sigismundo" src="https://avatars.githubusercontent.com/u/40403578?s=60&v=4"></Avatar>
    </Flex>  
  )
}