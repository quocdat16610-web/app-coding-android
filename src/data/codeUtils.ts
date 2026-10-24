/**
 * Returns the 1-based line numbers of `code` containing any of `needles`.
 * Keeps highlightLines correct when lesson code is edited.
 */
export function linesContaining(code: string, needles: string[]): number[] {
  return code
    .split('\n')
    .map((line, i) => (needles.some((n) => line.includes(n)) ? i + 1 : 0))
    .filter((n) => n > 0);
}

const ACTIVITY_IMPORTS = [
  'android.os.Bundle',
  'androidx.activity.ComponentActivity',
  'androidx.activity.compose.setContent',
  'androidx.compose.foundation.layout.fillMaxSize',
  'androidx.compose.material3.MaterialTheme',
  'androidx.compose.material3.Surface',
  'androidx.compose.runtime.Composable',
  'androidx.compose.ui.Modifier',
];

interface ActivityFileOptions {
  /** Extra fully-qualified imports needed by `body`. */
  imports: string[];
  /** Composable call placed inside setContent, e.g. "CounterScreen()". */
  screen: string;
  /** Top-level declarations that follow MainActivity. */
  body: string;
  /** Wrapper around the Surface; defaults to MaterialTheme. */
  theme?: string;
}

/**
 * Builds a complete, compilable MainActivity.kt (package + sorted imports + class)
 * so every lesson can ship a copy-paste-ready example.
 */
export function activityFile({ imports, screen, body, theme = 'MaterialTheme' }: ActivityFileOptions): string {
  const allImports = [...new Set([...ACTIVITY_IMPORTS, ...imports])].sort();
  return `package com.example.myfirstapp

${allImports.map((i) => `import ${i}`).join('\n')}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ${theme} {
                Surface(modifier = Modifier.fillMaxSize()) {
                    ${screen}
                }
            }
        }
    }
}

${body.trim()}
`;
}
