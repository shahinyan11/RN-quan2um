import React from 'react';
import {Text} from 'react-native';

const highlightReplies = (text: string) => {
  const usernameRegex = /@([^\s]+)/g;
  const matches = text.match(usernameRegex);

  if (!matches) {
    return text;
  }

  // Split the text based on the matches
  const parts = text.split(usernameRegex);

  // Return the text with usernames highlighted in blue
  return parts.map((part, index) => {
    if (matches.includes(`@${part}`)) {
      return (
        <Text key={index} style={{color: '#09A9FC'}}>
          @{part}
        </Text>
      );
    }

    // No match, return the original part
    return part;
  });
};

export default highlightReplies;
