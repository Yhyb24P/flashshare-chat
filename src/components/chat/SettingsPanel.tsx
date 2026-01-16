import { Moon, Sun, Code, FileText, Volume2, Minimize2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function SettingsPanel() {
  const { settings, updateSettings, setTheme } = useAppStore();

  const toggles = [
    { key: 'markdown' as const, label: 'Markdown', icon: FileText },
    { key: 'codeHighlight' as const, label: 'Code Highlight', icon: Code },
    { key: 'sound' as const, label: 'Sound', icon: Volume2 },
    { key: 'compactMode' as const, label: 'Compact Mode', icon: Minimize2 },
  ];

  return (
    <div className="p-4 border-t border-border">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Settings
      </h3>

      <div className="space-y-3">
        {toggles.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center justify-between">
            <Label
              htmlFor={key}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              {label}
            </Label>
            <Switch
              id={key}
              checked={settings[key]}
              onCheckedChange={(checked) => updateSettings({ [key]: checked })}
            />
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <Label className="flex items-center gap-2 text-sm">
            {settings.theme === 'light' ? (
              <Sun className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
            Theme
          </Label>
          <div className="flex gap-1">
            <Button
              variant={settings.theme === 'light' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setTheme('light')}
            >
              <Sun className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={settings.theme === 'dark' ? 'default' : 'ghost'}
              size="sm"
              className="h-7 px-2"
              onClick={() => setTheme('dark')}
            >
              <Moon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
