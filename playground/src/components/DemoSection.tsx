import CodeIcon from '@mui/icons-material/Code'
import { Box, Collapse, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import CodeBlock from './CodeBlock'

interface Props {
  title: string
  description?: string
  code: string
  children: ReactNode
}

export default function DemoSection({ title, description, code, children }: Props) {
  const [showCode, setShowCode] = useState(false)

  return (
    <Box sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
              {description}
            </Typography>
          )}
        </Box>
        <Tooltip title={showCode ? 'Hide code' : 'Show code'}>
          <IconButton
            size="small"
            onClick={() => setShowCode((v) => !v)}
            color={showCode ? 'primary' : 'default'}
            sx={{ mt: 0.3 }}
          >
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          bgcolor: '#fff',
          borderRadius: showCode ? '8px 8px 0 0' : '8px',
          borderBottom: showCode ? '1px solid transparent' : undefined,
        }}
      >
        {children}
      </Paper>

      <Collapse in={showCode}>
        <CodeBlock code={code} />
      </Collapse>
    </Box>
  )
}
