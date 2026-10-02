import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box sx={{ position: 'relative', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
      <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: copied ? '#4caf50' : '#666',
            '&:hover': { color: '#ccc', bgcolor: 'rgba(255,255,255,0.08)' },
          }}
        >
          {copied ? <DoneIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2.5,
          pr: 6,
          bgcolor: '#16213e',
          color: '#e0e0e0',
          overflow: 'auto',
          fontSize: '0.78rem',
          fontFamily: '"Fira Code", "Cascadia Code", Consolas, "Courier New", monospace',
          lineHeight: 1.75,
        }}
      >
        <code>{code}</code>
      </Box>
    </Box>
  )
}
