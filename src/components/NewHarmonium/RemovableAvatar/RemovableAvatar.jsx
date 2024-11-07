import { Avatar, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

function RemovableAvatar({ src, onRemove }) {
  return (
    <div  style={{ position: 'relative', display: 'inline-block' }}>
      {/* Avatar obrázek */}
      <Avatar src={src} radius="md" size={70} />

      {/* Křížek pro odstranění */}
      <ActionIcon
        variant="filled"
              color="lightGreen"
              radius={20}
        size="sm"
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
        }}
        onClick={onRemove}
      >
        <IconX size={16} />
      </ActionIcon>
    </div>
  );
}

export default RemovableAvatar;