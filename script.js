// Presentation JavaScript
let currentSlide = 1;
const totalSlides = 20;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();
    updateSlide();
    createSlideDots();
    updateProgress();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousSlide();
        } else if (e.key === 'Home') {
            e.preventDefault();
            goToSlide(1);
        } else if (e.key === 'End') {
            e.preventDefault();
            goToSlide(totalSlides);
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            previousSlide();
        }
    }
});

function updateSlide() {
    const slides = document.querySelectorAll('.slide');
    
    // Different transitions for variety
    const transitions = [
        'transition-slide-left',   // Slide 1
        'transition-fade',          // Slide 2
        'transition-slide-right',   // Slide 3
        'transition-zoom',          // Slide 4
        'transition-slide-left',    // Slide 5
        'transition-flip',          // Slide 6
        'transition-rotate',        // Slide 7 (NEW: Running Application)
        'transition-bounce',        // Slide 8
        'transition-diagonal',      // Slide 9
        'transition-fade',          // Slide 10
        'transition-rotate',        // Slide 11
        'transition-slide-left',    // Slide 12
        'transition-zoom',          // Slide 13
        'transition-slide-right',   // Slide 14
        'transition-flip',          // Slide 15
        'transition-fade',          // Slide 16
        'transition-diagonal',      // Slide 17
        'transition-bounce',        // Slide 18
        'transition-slide-left',    // Slide 19
        'transition-zoom'           // Slide 20
    ];
    
    slides.forEach((slide, index) => {
        const slideNumber = index + 1;
        
        // Remove all transition classes
        transitions.forEach(t => slide.classList.remove(t));
        slide.classList.remove('active', 'prev');
        
        // Add the transition class for this slide
        if (transitions[index]) {
            slide.classList.add(transitions[index]);
        }
        
        if (slideNumber === currentSlide) {
            slide.classList.add('active');
            // Re-trigger animations
            const content = slide.querySelector('.content');
            if (content) {
                content.style.animation = 'none';
                setTimeout(() => {
                    content.style.animation = '';
                }, 10);
            }
        } else if (slideNumber < currentSlide) {
            slide.classList.add('prev');
        }
    });
    
    // Update indicators
    document.getElementById('currentSlide').textContent = currentSlide;
    document.getElementById('totalSlides').textContent = totalSlides;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
    
    updateProgress();
    updateDots();
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlide();
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        updateSlide();
    }
}

function updateProgress() {
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function createSlideDots() {
    const dotsContainer = document.getElementById('slideDots');
    for (let i = 1; i <= totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dot.title = `Slide ${i}`;
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Download Functions
function downloadVSCode() {
    const userAgent = navigator.userAgent.toLowerCase();
    let downloadUrl = 'https://code.visualstudio.com/download';
    
    if (userAgent.includes('win')) {
        downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user';
    } else if (userAgent.includes('mac')) {
        downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal';
    } else if (userAgent.includes('linux')) {
        downloadUrl = 'https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64';
    }
    
    window.open(downloadUrl, '_blank');
    showNotification('Opening VS Code download page...');
}

function downloadFlutterSDK() {
    const userAgent = navigator.userAgent.toLowerCase();
    let downloadUrl = 'https://docs.flutter.dev/get-started/install';
    
    if (userAgent.includes('win')) {
        downloadUrl = 'https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.16.0-stable.zip';
    } else if (userAgent.includes('mac')) {
        if (userAgent.includes('arm64') || userAgent.includes('m1') || userAgent.includes('m2')) {
            downloadUrl = 'https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_arm64_3.16.0-stable.zip';
        } else {
            downloadUrl = 'https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_3.16.0-stable.zip';
        }
    } else if (userAgent.includes('linux')) {
        downloadUrl = 'https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.0-stable.tar.xz';
    }
    
    window.open(downloadUrl, '_blank');
    showNotification('Downloading Flutter SDK...');
}

function openExtensions() {
    const extensionsInfo = `
To install Flutter extensions in VS Code:

1. Open VS Code
2. Press Ctrl+Shift+X (or Cmd+Shift+X on Mac)
3. Search for "Flutter"
4. Install the "Flutter" extension by Dart Code
5. The Dart extension will be installed automatically

Or use these commands:
code --install-extension Dart-Code.flutter
code --install-extension Dart-Code.dart-code
    `;
    
    alert(extensionsInfo);
    
    // Try to open VS Code marketplace
    window.open('https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter', '_blank');
}

function downloadGit() {
    window.open('https://git-scm.com/downloads', '_blank');
    showNotification('Opening Git download page...');
}

function downloadAndroidStudio() {
    window.open('https://developer.android.com/studio', '_blank');
    showNotification('Opening Android Studio download page...');
}

function downloadAndroidCmdTools() {
    window.open('https://developer.android.com/studio#command-line-tools-only', '_blank');
    showNotification('Opening Android SDK command-line tools page...');
}

function downloadJDK() {
    window.open('https://www.oracle.com/java/technologies/downloads/#java17', '_blank');
    showNotification('Opening JDK 17 download page...');
}

function copyPathCommand() {
    const command = `# Add Flutter to PATH (Windows)
# Add this to your System Environment Variables:
# C:\\src\\flutter\\bin

# Or run this PowerShell command as Administrator:
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\\src\\flutter\\bin", "User")`;
    
    copyToClipboard(command);
    showNotification('PATH command copied to clipboard!');
}

function copyCommand(command) {
    copyToClipboard(command);
    showNotification('Command copied to clipboard!');
}

function copyCode(button) {
    const codeBlock = button.closest('.code-container').querySelector('code');
    const code = codeBlock.textContent;
    copyToClipboard(code);
    
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        console.log('Copied using fallback method');
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #02569B, #13B9FD);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out, fadeOut 0.3s ease-out 2.7s;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
`;
document.head.appendChild(style);

// Add copy button functionality to all code blocks
document.addEventListener('DOMContentLoaded', () => {
    const codeContainers = document.querySelectorAll('.code-container');
    codeContainers.forEach(container => {
        const copyBtn = container.querySelector('.copy-code-btn');
        if (copyBtn && !copyBtn.hasAttribute('onclick')) {
            copyBtn.addEventListener('click', function() {
                copyCode(this);
            });
        }
    });
});

// Fullscreen toggle (bonus feature)
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Add F11 key for fullscreen
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});

// Prevent context menu on presentation (optional)
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// Add slide transition sounds (optional - requires audio files)
function playSlideSound() {
    // Uncomment if you add sound files
    // const audio = new Audio('slide-sound.mp3');
    // audio.volume = 0.3;
    // audio.play();
}

// Analytics (you can add your tracking here)
function trackSlideView(slideNumber) {
    console.log(`Viewing slide ${slideNumber}`);
    // Add your analytics tracking here
    // Example: gtag('event', 'slide_view', { slide_number: slideNumber });
}

// Auto-advance slides (optional feature)
let autoAdvanceInterval;
let isAutoAdvancing = false;

function startAutoAdvance(seconds = 10) {
    if (isAutoAdvancing) return;
    
    isAutoAdvancing = true;
    autoAdvanceInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            stopAutoAdvance();
        }
    }, seconds * 1000);
    
    showNotification(`Auto-advance started (${seconds}s per slide)`);
}

function stopAutoAdvance() {
    if (!isAutoAdvancing) return;
    
    clearInterval(autoAdvanceInterval);
    isAutoAdvancing = false;
    showNotification('Auto-advance stopped');
}

// Add keyboard shortcut for auto-advance (Press 'A')
document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'A') {
        if (isAutoAdvancing) {
            stopAutoAdvance();
        } else {
            startAutoAdvance(5);
        }
    }
});

// Presentation timer
let presentationStartTime;
let timerInterval;

function startPresentationTimer() {
    presentationStartTime = Date.now();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - presentationStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    console.log(`Presentation time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
}

function stopPresentationTimer() {
    clearInterval(timerInterval);
}

// Speaker notes (press 'N' to toggle)
let notesVisible = false;

function toggleNotes() {
    notesVisible = !notesVisible;
    // You can implement speaker notes display here
    console.log('Speaker notes:', notesVisible ? 'shown' : 'hidden');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'n' || e.key === 'N') {
        toggleNotes();
    }
});

// Print all slides
function printPresentation() {
    window.print();
}

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        printPresentation();
    }
});

// Help overlay (press '?' to see keyboard shortcuts)
function showHelp() {
    const helpText = `
Keyboard Shortcuts:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ or Space    Next slide
←             Previous slide
Home          First slide
End           Last slide
F11           Fullscreen
A             Auto-advance toggle
N             Speaker notes
Ctrl+P        Print presentation
?             Show this help
    `;
    
    alert(helpText);
}

document.addEventListener('keydown', (e) => {
    if (e.key === '?') {
        showHelp();
    }
});

console.log('%c🚀 Flutter Presentation Ready!', 'color: #02569B; font-size: 20px; font-weight: bold;');
console.log('%cPress ? for keyboard shortcuts', 'color: #13B9FD; font-size: 14px;');

// Widget Explorer Functionality
const widgetCodeData = {
    layout: {
        container: {
            name: 'Container',
            code: `Container(
  width: 200,
  height: 100,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(8),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(12),
  ),
  child: Text('Hello!'),
)`
        },
        column: {
            name: 'Column',
            code: `Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('First'),
    Text('Second'),
    Text('Third'),
  ],
)`
        },
        row: {
            name: 'Row',
            code: `Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Icon(Icons.star),
    Icon(Icons.favorite),
    Icon(Icons.share),
  ],
)`
        },
        stack: {
            name: 'Stack',
            code: `Stack(
  children: [
    Container(color: Colors.blue),
    Positioned(
      top: 20,
      left: 20,
      child: Text('Overlay'),
    ),
  ],
)`
        }
    },
    ui: {
        text: {
            name: 'Text',
            code: `Text(
  'Hello Flutter!',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 2.0,
  ),
)`
        },
        image: {
            name: 'Image',
            code: `// Network Image
Image.network(
  'https://example.com/image.png',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
)

// Asset Image
Image.asset('assets/logo.png')`
        },
        icon: {
            name: 'Icon',
            code: `Icon(
  Icons.favorite,
  color: Colors.red,
  size: 48.0,
)`
        },
        card: {
            name: 'Card',
            code: `Card(
  elevation: 8.0,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Text('Card Content'),
  ),
)`
        }
    },
    interactive: {
        button: {
            name: 'ElevatedButton',
            code: `ElevatedButton(
  onPressed: () {
    print('Button pressed!');
  },
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.blue,
    padding: EdgeInsets.symmetric(
      horizontal: 32,
      vertical: 16,
    ),
  ),
  child: Text('Click Me'),
)`
        },
        textfield: {
            name: 'TextField',
            code: `TextField(
  decoration: InputDecoration(
    labelText: 'Enter your name',
    hintText: 'John Doe',
    border: OutlineInputBorder(),
    prefixIcon: Icon(Icons.person),
  ),
  onChanged: (value) {
    print('Input: $value');
  },
)`
        },
        checkbox: {
            name: 'Checkbox',
            code: `bool isChecked = false;

Checkbox(
  value: isChecked,
  onChanged: (bool? value) {
    setState(() {
      isChecked = value ?? false;
    });
  },
)`
        },
        switch: {
            name: 'Switch',
            code: `bool isSwitched = false;

Switch(
  value: isSwitched,
  onChanged: (bool value) {
    setState(() {
      isSwitched = value;
    });
  },
  activeColor: Colors.green,
)`
        }
    },
    statemanagement: {
        setstate: {
            name: 'setState()',
            code: `// Basic Flutter state management
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// ✅ Simple for small widgets
// ❌ Rebuilds entire widget
// ❌ Hard to share state between widgets`
        },
        getx: {
            name: 'GetX ⭐ RECOMMENDED',
            code: `// Add to pubspec.yaml: get: ^4.6.6

// 1. Create a Controller
class CounterController extends GetxController {
  var count = 0.obs; // Observable variable
  
  void increment() => count++;
  void decrement() => count--;
}

// 2. Use in your app
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Initialize controller
    final CounterController c = Get.put(CounterController());
    
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Obx widget rebuilds only this part
            Obx(() => Text(
              'Count: \${c.count}',
              style: TextStyle(fontSize: 32),
            )),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: c.decrement,
                  child: Icon(Icons.remove),
                ),
                ElevatedButton(
                  onPressed: c.increment,
                  child: Icon(Icons.add),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// ✅ Simple syntax (.obs for reactive variables)
// ✅ Built-in navigation: Get.to(NextPage())
// ✅ Dependency injection: Get.put(), Get.find()
// ✅ Snackbars & Dialogs: Get.snackbar()
// ✅ Extremely lightweight and fast`
        },
        provider: {
            name: 'Provider',
            code: `// Add to pubspec.yaml: provider: ^6.0.0

class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// Wrap app with Provider
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// Access in widget
class CounterDisplay extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<Counter>(
      builder: (context, counter, child) {
        return Text('Count: \${counter.count}');
      },
    );
  }
}

// Update state
context.read<Counter>().increment();

// ✅ Recommended by Flutter team
// ✅ Good for medium apps
// ❌ More boilerplate than GetX`
        },
        riverpod: {
            name: 'Riverpod',
            code: `// Add to pubspec.yaml: flutter_riverpod: ^2.3.0

// 1. Create a provider
final counterProvider = StateProvider<int>((ref) => 0);

// 2. Wrap app with ProviderScope
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

// 3. Use in widget
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () {
            ref.read(counterProvider.notifier).state++;
          },
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// ✅ Compile-time safe
// ✅ No BuildContext needed
// ✅ Testable without mocking
// ✅ Modern alternative to Provider`
        },
        bloc: {
            name: 'BLoC',
            code: `// Add to pubspec.yaml: flutter_bloc: ^8.1.0

// 1. Define Events
abstract class CounterEvent {}
class Increment extends CounterEvent {}
class Decrement extends CounterEvent {}

// 2. Create Bloc
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<Increment>((event, emit) => emit(state + 1));
    on<Decrement>((event, emit) => emit(state - 1));
  }
}

// 3. Use in widget
class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CounterBloc(),
      child: BlocBuilder<CounterBloc, int>(
        builder: (context, count) {
          return Column(
            children: [
              Text('Count: $count'),
              ElevatedButton(
                onPressed: () {
                  context.read<CounterBloc>().add(Increment());
                },
                child: Text('Increment'),
              ),
            ],
          );
        },
      ),
    );
  }
}

// ✅ Predictable event-driven
// ✅ Great for large apps
// ❌ More boilerplate code`
        }
    }
};

// Initialize widget explorers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeWidgetExplorers();
});

function initializeWidgetExplorers() {
    // Get all slides with widget explorers
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide) => {
        const widgetItems = slide.querySelectorAll('.widget-item');
        
        widgetItems.forEach((item) => {
            item.addEventListener('click', function() {
                const widgetType = this.getAttribute('data-widget');
                const slideNumber = slide.getAttribute('data-slide');
                
                // Determine which category (layout, ui, interactive, statemanagement)
                let category = '';
                if (slideNumber === '11') category = 'layout';
                else if (slideNumber === '12') category = 'ui';
                else if (slideNumber === '13') category = 'interactive';
                else if (slideNumber === '16') category = 'statemanagement';
                
                if (category && widgetType) {
                    updateWidgetCode(category, widgetType, slide);
                }
                
                // Update active state
                slide.querySelectorAll('.widget-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

function updateWidgetCode(category, widgetType, slide) {
    const widgetData = widgetCodeData[category][widgetType];
    
    if (!widgetData) return;
    
    // Update widget name
    const nameElement = slide.querySelector(`#${category}-widget-name`);
    if (nameElement) {
        nameElement.textContent = widgetData.name;
    }
    
    // Update code content
    const codeElement = slide.querySelector(`#${category}-code-content code`);
    if (codeElement) {
        codeElement.textContent = widgetData.code;
        // Re-highlight the code
        hljs.highlightElement(codeElement);
    }
}

function copyWidgetCode(category) {
    const codeElement = document.querySelector(`#${category}-code-content code`);
    if (codeElement) {
        copyToClipboard(codeElement.textContent);
        showNotification('Code copied to clipboard!');
    }
}
