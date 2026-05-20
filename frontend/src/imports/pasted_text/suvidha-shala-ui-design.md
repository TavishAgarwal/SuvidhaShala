Design a complete, production-quality web application UI for "SuvidhaShala" 
— an AI-powered inclusive education platform for Indian school teachers. 
The app takes any NCERT textbook chapter and generates three parallel 
adapted versions: Standard, Dyslexia-friendly, and Dyscalculia/ADHD-friendly.

─────────────────────────────────────────
BRAND & VISUAL IDENTITY
─────────────────────────────────────────
App name: SuvidhaShala (सुविधाशाला)
Tagline: "The Accessible Classroom"

Color palette:
  Primary:       #1B5E8B  (deep teal-blue)
  Primary light: #E8F4FD  (very light blue, backgrounds)
  Accent:        #E67E22  (warm orange, CTAs and highlights)
  Accent light:  #FEF5EC  (soft orange background)
  Success:       #1E7E34  (dark green)
  Success light: #EAF5EA
  Warning:       #F39C12  (amber)
  Dark text:     #1A1A2E
  Body text:     #444455
  Muted text:    #888899
  Border:        #D0D8E4
  Background:    #F8FAFC  (off-white, not pure white)
  White:         #FFFFFF

Typography:
  Headings: Inter or Plus Jakarta Sans, Bold
  Body: Inter, Regular 400 / Medium 500
  Dyslexia preview panel only: OpenDyslexic or Lexie Readable
  Base size: 15px body, 13px labels, 11px captions
  Line height: 1.6 for body, 1.5 for headings

Design language:
  - Rounded corners: 12px cards, 8px buttons, 6px inputs
  - Soft shadows: 0 2px 12px rgba(0,0,0,0.06)
  - Clean, spacious, no visual clutter
  - Accessibility-first: WCAG AA contrast minimum
  - Warm and approachable, not clinical or corporate
  - No dark mode needed — light theme only

─────────────────────────────────────────
SCREEN 1 — LANDING / HOME
─────────────────────────────────────────
Layout: Full-width, single page, navbar + hero + feature strips

Navbar (sticky, white, subtle bottom border):
  - Left: SuvidhaShala logo (teal circle icon with a stylised 'S' + 
    text "SuvidhaShala" in #1B5E8B bold)
  - Right: "How it works" link, "WhatsApp Bot" link (with WhatsApp 
    green icon), "Get Started" button (accent orange, filled)

Hero section (centered, generous padding):
  - Large heading: "Every child deserves content that fits how 
    they learn." (Inter Bold, 48px, dark)
  - Subheading: "SuvidhaShala transforms any NCERT chapter into 
    three parallel versions — for standard learners, children with 
    dyslexia, and children with dyscalculia or ADHD. Free. Instant. 
    In your language." (16px, muted)
  - Two CTA buttons side by side:
      Primary: "Generate a Worksheet" (orange filled, large)
      Secondary: "Try on WhatsApp" (teal outlined, WhatsApp icon)
  - Below buttons: small text "No account needed. No training 
    required. Works on any device."
  - Hero visual: A mockup showing the three-panel preview UI 
    (can be a stylised illustration or screen mockup), slightly 
    tilted, with a soft blue glow behind it

Three stat callout boxes (below hero, horizontal row):
  Box 1: "8.2M" / "Children with learning disabilities in India" / 
          "Receiving zero adapted content" / Red-tinted background
  Box 2: "20 sec" / "To generate all three versions" / 
          "For any chapter, any subject" / Blue-tinted background
  Box 3: "₹0" / "Cost for government school teachers" / 
          "Always free, no signup" / Green-tinted background

Feature strip (3 columns, icon + title + description):
  1. "NCERT Library Built In" — Select any chapter from Classes 1–8 
     without uploading anything
  2. "Camera Upload" — Photograph any state board textbook page. 
     AI reads and adapts it.
  3. "WhatsApp Delivery" — Send one message. Receive the PDF. 
     No app needed.

─────────────────────────────────────────
SCREEN 2 — MAIN GENERATOR (Core Screen)
─────────────────────────────────────────
Layout: Two-column — left sidebar (input panel) + right main area 
(output panel). Sidebar: 320px fixed. Main area: fills remaining width.

LEFT SIDEBAR — Input Panel:
  Header: "Generate Worksheet" in bold with a small wand/sparkle icon

  Section A — "Choose a chapter":
    Toggle tabs: [ NCERT Library | Upload PDF | Camera Photo ]
    
    NCERT Library tab (default active):
      - Dropdown: "Select Class" (1 through 8)
      - Dropdown: "Select Subject" (Mathematics, Science, English, 
        Hindi, Social Science)
      - Dropdown: "Select Chapter" (populates based on above)
      - Small preview text: Chapter name appears below in muted 
        style once selected
    
    Upload PDF tab:
      - Large dashed upload zone: "Drop your PDF here or click 
        to browse" with PDF icon, accepts .pdf
      - Below: "Or photograph a textbook page →" link that 
        switches to Camera tab
    
    Camera Photo tab:
      - Upload zone: "Upload photos of textbook pages" 
        accepts jpg/png, multiple files
      - Once uploaded: horizontal scrollable thumbnail strip 
        with drag-to-reorder handles and × to remove
      - Helper text: "Upload pages in order. One page per photo."

  Divider line

  Section B — "Choose versions to generate":
    Label: "Which versions do you need?"
    Three toggle cards (selectable, multi-select, teal border 
    when selected):
      Card 1: Checkbox + "Standard" + "Improved clarity for 
               all learners"
      Card 2: Checkbox + "Dyslexia Edition" + "Shorter sentences, 
               wider spacing, syllable guides" + soft blue pill 
               badge "Edition B"
      Card 3: Checkbox + "Dyscalculia / ADHD Edition" + 
               "Step-by-step, visual anchors, progress boxes" + 
               soft orange pill badge "Edition C"
    Default: all three selected

  Divider line

  Section C — "Language":
    Label: "Output language"
    Toggle pills: [ English | Hindi ]  (more greyed out: 
    Tamil · Telugu · Coming soon)

  Bottom of sidebar:
    Large full-width button: "Generate All Versions" 
    (accent orange, rounded 10px, 48px tall, sparkle icon left)
    Below: "~20 seconds · Powered by GPT-4o"

RIGHT MAIN AREA — Three-Panel Preview:

  State A — Empty (before generation):
    Centered illustration of three document cards fanned out 
    with a soft glow, muted colors
    Text: "Your three versions will appear here"
    Subtext: "Select a chapter and click Generate"

  State B — Loading:
    Three skeleton card panels side by side, pulsing animation
    Below: Progress indicator with steps:
      ✓ Analysing chapter content...
      ● Generating Standard version...
      ○ Generating Dyslexia version...
      ○ Generating Dyscalculia version...
      ○ Running quality check...
    Estimated time countdown: "~18 seconds remaining"

  State C — Results (primary state to design in detail):
    
    Top bar above the three panels:
      Left: "Class 5 · Science · Chapter 2 · Components of Food"
      Right: Two buttons — "Download All (ZIP)" and "Share"
      Quality badge: green pill "All objectives verified ✓"
    
    Three panels side by side (equal width, synchronized scroll):
      Each panel has:
        - Panel header (colored top bar):
            Panel 1: Teal — "Standard · Edition A"
            Panel 2: Blue — "Dyslexia-Friendly · Edition B"  
            Panel 3: Orange — "Dyscalculia / ADHD · Edition C"
        - Download button (small, in panel header, right side): 
          PDF icon + "Download PDF"  |  DOCX icon + "Download DOCX"
        - Content area: scrollable, white background, 
          actual rendered text content
        
        Panel 2 (Dyslexia) specific styling:
          - OpenDyslexic font or wide-spaced sans-serif
          - 1.5× line height visually
          - Syllable dots visible in headings: "pho·to·syn·the·sis"
          - Generous paragraph spacing
          - Left-aligned text only
        
        Panel 3 (Dyscalculia/ADHD) specific styling:
          - Numbered steps with checkbox squares □
          - Bold step numbers in teal
          - Content in labelled boxes: 
            [DEFINITION] [EXAMPLE] [TRY IT] [REMEMBER]
          - Visual number line illustration in math sections
    
    Below panels:
      Synchronized scroll indicator — thin progress bar 
      spanning all three panels showing scroll position
      
      "Not satisfied?" row:
        "Regenerate" button (outlined) | 
        "Adjust settings" button (outlined) |
        "Report an issue" link

─────────────────────────────────────────
SCREEN 3 — WHATSAPP BOT PAGE
─────────────────────────────────────────
Layout: Centered single column, max-width 720px

Header: WhatsApp green icon + "SuvidhaShala on WhatsApp"
Subheading: "No app. No login. Just send a message."

WhatsApp phone mockup (centered):
  Show a realistic phone frame containing a WhatsApp conversation:
  
  Teacher message (right, green bubble):
    "5 science 3 dyslexia"
  
  Bot reply (left, white bubble):
    "Creating your dyslexia-friendly worksheet...
     Class 5 · Science · Chapter 3
     This takes about 20 seconds ⏳"
  
  Bot reply (left, white bubble, after):
    📄 SuvidhaShala_Class5_Science_Ch3_Dyslexia.pdf
    "Your worksheet is ready! 
     ✓ Shorter sentences  ✓ Wider spacing  ✓ Syllable guides
     Reply 'New' for another worksheet"

Below mockup:
  Step-by-step guide (horizontal, 3 steps with icons):
    1. "Save our number" → show the number + QR code
    2. "Send class, subject, chapter, version"
    3. "Receive your PDF instantly"

  "Or scan to start chatting" → WhatsApp QR code

  Feature pills: 
    "Works on 2G" | "No smartphone needed" | 
    "Hindi & English" | "Free forever"

─────────────────────────────────────────
SCREEN 4 — MOBILE RESPONSIVE (Phone View)
─────────────────────────────────────────
The generator screen collapses to:
  - Full width input form (all sidebar content stacked vertically)
  - "Generate" button fixed at bottom of screen
  - Results: Three tabs instead of three columns
    Tab bar: [Standard] [Dyslexia ●] [ADHD ●]
    Single scrollable panel showing active tab content
  - Download button: full width, sticky above tab bar

─────────────────────────────────────────
COMPONENT LIBRARY (Design System)
─────────────────────────────────────────
Create reusable components for:

Buttons:
  - Primary filled (orange): Generate, Download All
  - Secondary filled (teal): Get Started, Try WhatsApp
  - Outlined teal: Regenerate, Adjust Settings
  - Ghost: Cancel, Report issue
  - Icon button: small square with icon only

Form elements:
  - Dropdown select with teal focus ring
  - Toggle tabs (Library / Upload / Camera)
  - Selection cards (checkboxes with border highlight)
  - Language pills (toggle style)
  - Drag-and-drop upload zone (dashed border, icon centered)

Cards:
  - Feature card (icon + title + body)
  - Stat card (large number + label + sub-label)
  - Panel card (colored header + scrollable content)
  - Version toggle card (checkbox + label + description + badge)

Badges and pills:
  - Edition B (blue, small)
  - Edition C (orange, small)
  - Quality verified (green, with checkmark)
  - Coming soon (grey, muted)

Progress indicators:
  - Step progress (with ✓ done / ● active / ○ pending)
  - Skeleton loading animation
  - Countdown timer text

Alerts:
  - Info (blue): "This chapter was generated from a photo. 
    Review before printing."
  - Warning (amber): "Section 3 flagged for review — 
    curriculum fidelity uncertain."
  - Success (green): "All three versions verified ✓"

Navigation:
  - Top navbar (sticky)
  - Mobile bottom tab bar
  - Sidebar panel

─────────────────────────────────────────
SPACING & GRID
─────────────────────────────────────────
Grid: 12-column, 24px gutter, 48px outer margin on desktop
Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
Section padding: 80px vertical on desktop, 48px on mobile
Card padding: 24px
Sidebar padding: 24px
Panel content padding: 20px

─────────────────────────────────────────
SCREENS TO DELIVER
─────────────────────────────────────────
1. Landing page — desktop
2. Generator — empty state — desktop
3. Generator — loading state — desktop
4. Generator — results state — desktop (PRIORITY — most detailed)
5. Generator — results state — mobile (tabbed)
6. WhatsApp bot page — desktop
7. Component library page

Total: 7 screens + 1 component library frame