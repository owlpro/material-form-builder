import {
  Box,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'

const DRAWER_WIDTH = 248

const INPUT_GROUPS = [
  {
    group: 'Text',
    items: [
      { label: 'Text', path: '/inputs/text', available: true },
      { label: 'Number', path: '/inputs/number', available: true },
      { label: 'Password', path: '/inputs/password', available: true },
      { label: 'Mask', path: '/inputs/mask', available: true },
    ],
  },
  {
    group: 'Selection',
    items: [
      { label: 'Select', path: '/inputs/select', available: true },
      { label: 'Autocomplete', path: '/inputs/autocomplete', available: false },
      { label: 'Toggle', path: '/inputs/toggle', available: false },
      { label: 'Checkbox', path: '/inputs/checkbox', available: false },
      { label: 'Switch', path: '/inputs/switch', available: false },
    ],
  },
  {
    group: 'Date & Time',
    items: [
      { label: 'Date', path: '/inputs/date', available: false },
      { label: 'Time', path: '/inputs/time', available: false },
      { label: 'Datetime', path: '/inputs/datetime', available: false },
    ],
  },
  {
    group: 'Special',
    items: [
      { label: 'Mobile', path: '/inputs/mobile', available: false },
      { label: 'OTP', path: '/inputs/otp', available: false },
      { label: 'File', path: '/inputs/file', available: false },
    ],
  },
  {
    group: 'Layout',
    items: [
      { label: 'Items', path: '/inputs/items', available: false },
      { label: 'Group', path: '/inputs/group', available: false },
      { label: 'Custom', path: '/inputs/custom', available: false },
    ],
  },
]

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: '#fafafa',
          },
        }}
      >
        <Box sx={{ p: 2.5, pb: 1.5, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
            material-form-builder
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Playground
          </Typography>
        </Box>
        <Divider />

        {INPUT_GROUPS.map((group) => (
          <Box key={group.group}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                pt: 2,
                pb: 0.5,
                display: 'block',
                fontWeight: 700,
                color: 'text.disabled',
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontSize: '0.65rem',
              }}
            >
              {group.group}
            </Typography>
            <List dense disablePadding>
              {group.items.map((item) => (
                <ListItem key={item.path} disablePadding sx={{ pr: 1 }}>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    disabled={!item.available}
                    onClick={() => navigate(item.path)}
                    sx={{ pl: 2, py: 0.4, borderRadius: '0 20px 20px 0' }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                    {!item.available && (
                      <Chip
                        label="soon"
                        size="small"
                        sx={{ height: 15, fontSize: '0.6rem', '& .MuiChip-label': { px: 0.8 } }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Header />
        <Toolbar variant="dense" sx={{ minHeight: 48 }} />
        <Box sx={{ p: 5, maxWidth: 880 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
