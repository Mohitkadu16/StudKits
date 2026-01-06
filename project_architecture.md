# StudKits Project - Complete Architecture Flowchart

This document contains comprehensive Mermaid flowcharts showing the entire StudKits project architecture.

## 1. Overall Application Architecture

```mermaid
graph TB
    subgraph "Entry Point"
        ROOT[Root Layout<br/>layout.tsx]
        HOME[Home Page<br/>page.tsx]
    end

    subgraph "Core Providers"
        THEME[ThemeProvider]
        AUTH[AuthProvider<br/>auth-context]
        CART[CartProvider<br/>cart-context]
        ANALYTICS[AnalyticsProvider]
    end

    subgraph "Main Pages"
        ABOUT[About Page]
        CONTACT[Contact Page]
        LOGIN[Login Page]
        SIGNUP[Signup Page]
        PROFILE[Profile Page]
    end

    subgraph "Marketplace Flow"
        MARKET[Marketplace Page]
        CHECKOUT[Checkout Page]
        CART_DRAWER[CartDrawer Component]
    end

    subgraph "Projects Section"
        PROJECTS[Projects Page]
        CUSTOM_PROJ[Custom Project Page]
        CUSTOM_PRES[Custom Presentation]
    end

    subgraph "Services"
        TRACKING[Tracking Service]
        TROUBLESHOOT[Troubleshooting Service]
        SUMMARIZER[AI Summarizer]
        ADMIN[Admin Dashboard]
    end

    ROOT --> THEME
    THEME --> AUTH
    AUTH --> CART
    CART --> ANALYTICS

    ANALYTICS --> HOME
    ANALYTICS --> MAIN_PAGES
    ANALYTICS --> MARKET
    ANALYTICS --> PROJECTS
    ANALYTICS --> SERVICES

    HOME --> MAIN_PAGES
    MAIN_PAGES --> ABOUT
    MAIN_PAGES --> CONTACT
    MAIN_PAGES --> LOGIN
    MAIN_PAGES --> SIGNUP
    MAIN_PAGES --> PROFILE

    MARKET --> CART_DRAWER
    CART_DRAWER --> CHECKOUT

    PROJECTS --> CUSTOM_PROJ
    PROJECTS --> CUSTOM_PRES

    SERVICES --> TRACKING
    SERVICES --> TROUBLESHOOT
    SERVICES --> SUMMARIZER
    SERVICES --> ADMIN
```

## 2. Marketplace & Cart System Flow

```mermaid
graph TB
    subgraph "User Journey"
        START([User Visits Marketplace])
        BROWSE[Browse Products]
        ADD[Add to Cart]
        VIEW_CART[View Cart Drawer]
        ENTER_PIN[Enter Pincode]
        PROCEED[Proceed to Checkout]
        FILL_FORM[Fill Customer Info]
        SELECT_PAY[Select Payment Method]
        SUBMIT[Submit Order]
        SUCCESS([Order Success])
    end

    subgraph "Cart Context State"
        ITEMS[Cart Items Array]
        SUBTOTAL[Calculate Subtotal]
        PINCODE[Pincode State]
        DELIVERY[Delivery Charge]
        SMALL_FEE[Small Cart Fee]
        TOTAL[Total Amount]
    end

    subgraph "Delivery Logic"
        VALIDATE_PIN{Valid Pincode?}
        CHECK_REGION[Get Region]
        FREE_ZONE{Free Zone?}
        MUMBAI{Mumbai?}
        PUNE{Pune?}
        OTHER_REGION[Other Regions]
        CALC_CHARGE[Calculate Charge]
    end

    subgraph "Fee Calculations"
        CHECK_AMOUNT{Subtotal < ₹100?}
        ADD_SMALL_FEE[Add ₹50 Fee]
        NO_SMALL_FEE[No Small Fee]
    end

    subgraph "Order Submission"
        FORMSPREE[Formspree API]
        EMAIL[Email Notification]
        CONFIRM[Confirmation Page]
    end

    START --> BROWSE
    BROWSE --> ADD
    ADD --> ITEMS
    ITEMS --> SUBTOTAL
    ADD --> VIEW_CART
    VIEW_CART --> ENTER_PIN
    ENTER_PIN --> PINCODE
    PINCODE --> VALIDATE_PIN

    VALIDATE_PIN -->|Yes| CHECK_REGION
    VALIDATE_PIN -->|No| VIEW_CART

    CHECK_REGION --> FREE_ZONE
    FREE_ZONE -->|Yes| DELIVERY
    FREE_ZONE -->|No| MUMBAI
    MUMBAI -->|Yes| CALC_CHARGE
    MUMBAI -->|No| PUNE
    PUNE -->|Yes| CALC_CHARGE
    PUNE -->|No| OTHER_REGION
    OTHER_REGION --> CALC_CHARGE
    CALC_CHARGE --> DELIVERY

    SUBTOTAL --> CHECK_AMOUNT
    CHECK_AMOUNT -->|Yes| ADD_SMALL_FEE
    CHECK_AMOUNT -->|No| NO_SMALL_FEE
    ADD_SMALL_FEE --> SMALL_FEE
    NO_SMALL_FEE --> SMALL_FEE

    SUBTOTAL --> TOTAL
    DELIVERY --> TOTAL
    SMALL_FEE --> TOTAL

    VIEW_CART --> PROCEED
    PROCEED --> CHECKOUT
    CHECKOUT --> FILL_FORM
    FILL_FORM --> SELECT_PAY
    SELECT_PAY --> SUBMIT
    SUBMIT --> FORMSPREE
    FORMSPREE --> EMAIL
    FORMSPREE --> CONFIRM
    CONFIRM --> SUCCESS
```

## 3. Component Hierarchy

```mermaid
graph TB
    subgraph "Layout Components"
        NAVBAR[Navbar]
        FOOTER[Footer]
        MAX_WIDTH[MaxWidthWrapper]
    end

    subgraph "Marketplace Components"
        PRODUCT_CARD[ProductCard]
        FILTERS[FiltersSidebar]
        CART_DRAWER_COMP[CartDrawer]
    end

    subgraph "Project Components"
        PROJECT_CARD[ProjectCard]
        PROJECT_FILTER[ProjectFilter]
        PROJECT_DETAIL[ProjectDetail]
        MICROCONTROLLER[MicrocontrollerSelector]
    end

    subgraph "Admin Components"
        ADMIN_DASH[AdminDashboard]
        PROJECT_MANAGE[ProjectManagement]
        USER_MANAGE[UserManagement]
    end

    subgraph "Tracking Components"
        TRACK_FORM[TrackingForm]
        TRACK_RESULT[TrackingResult]
    end

    subgraph "Troubleshooting Components"
        TROUBLE_FORM[TroubleshootingForm]
        TROUBLE_RESULT[TroubleshootingResult]
        AI_SUGGEST[AISuggestions]
    end

    subgraph "UI Components"
        BUTTON[Button]
        INPUT[Input]
        CARD[Card]
        DIALOG[Dialog]
        TOAST[Toast/Toaster]
        DROPDOWN[Dropdown]
    end

    NAVBAR --> MAX_WIDTH
    FOOTER --> MAX_WIDTH

    PRODUCT_CARD --> BUTTON
    PRODUCT_CARD --> CARD
    FILTERS --> DROPDOWN
    CART_DRAWER_COMP --> BUTTON
    CART_DRAWER_COMP --> INPUT

    PROJECT_CARD --> CARD
    PROJECT_CARD --> BUTTON
    PROJECT_FILTER --> DROPDOWN
    MICROCONTROLLER --> DROPDOWN

    ADMIN_DASH --> PROJECT_MANAGE
    ADMIN_DASH --> USER_MANAGE

    TRACK_FORM --> INPUT
    TRACK_FORM --> BUTTON
    TRACK_RESULT --> CARD

    TROUBLE_FORM --> INPUT
    TROUBLE_RESULT --> AI_SUGGEST
```

## 4. Data Flow & State Management

```mermaid
graph LR
    subgraph "Contexts"
        AUTH_CTX[AuthContext<br/>- user<br/>- login<br/>- logout<br/>- signup]
        CART_CTX[CartContext<br/>- items<br/>- subtotal<br/>- deliveryCharge<br/>- smallCartFee<br/>- total<br/>- pincode]
    end

    subgraph "Libraries"
        FIREBASE[Firebase<br/>- Authentication<br/>- Firestore<br/>- Storage]
        PRODUCTS_LIB[Products Library<br/>- sampleProducts<br/>- Product types]
        DELIVERY_LIB[Delivery Library<br/>- getRegion<br/>- getDeliveryCharge<br/>- calculateDistance]
        PROJECTS_LIB[Projects Library<br/>- projectsData<br/>- categories]
        TRACKING_LIB[Tracking Library<br/>- trackOrder<br/>- getStatus]
    end

    subgraph "External Services"
        FORMSPREE[Formspree<br/>Order Submissions]
        EMAILJS[EmailJS<br/>Contact Forms]
        ANALYTICS_SVC[Google Analytics<br/>Tracking]
    end

    AUTH_CTX --> FIREBASE
    CART_CTX --> PRODUCTS_LIB
    CART_CTX --> DELIVERY_LIB

    CART_CTX --> FORMSPREE
    CONTACT --> EMAILJS
    ANALYTICS_SVC --> ALL_PAGES

    PROJECTS_LIB --> FIREBASE
    TRACKING_LIB --> FIREBASE
```

## 5. Regional Delivery Pricing System

```mermaid
graph TD
    START([Customer Enters Pincode])
    VALIDATE{Valid 6-digit<br/>Pincode?}

    CHECK_FREE{400008-400013<br/>400027, 400033?}
    CHECK_MUMBAI{400001-400104?}
    CHECK_PUNE{410001-413999?}
    CHECK_NASHIK{422001-424999?}
    CHECK_AURANG{431001-431999?}
    CHECK_VIDARBHA{440001-444999?}
    CHECK_MAHA{400001-444999?}

    FREE[Free Delivery<br/>₹0]
    MUMBAI[Mumbai<br/>₹100]
    PUNE[Pune<br/>₹150]
    NASHIK[Nashik<br/>₹180]
    AURANG[Aurangabad<br/>₹200]
    VIDARBHA[Vidarbha<br/>₹250]
    MAHA[Rest of Maharashtra<br/>₹300]
    OUTSIDE[Outside Maharashtra<br/>₹350]

    DISPLAY([Display Charge])

    START --> VALIDATE
    VALIDATE -->|No| START
    VALIDATE -->|Yes| CHECK_FREE

    CHECK_FREE -->|Yes| FREE
    CHECK_FREE -->|No| CHECK_MUMBAI
    CHECK_MUMBAI -->|Yes| MUMBAI
    CHECK_MUMBAI -->|No| CHECK_PUNE
    CHECK_PUNE -->|Yes| PUNE
    CHECK_PUNE -->|No| CHECK_NASHIK
    CHECK_NASHIK -->|Yes| NASHIK
    CHECK_NASHIK -->|No| CHECK_AURANG
    CHECK_AURANG -->|Yes| AURANG
    CHECK_AURANG -->|No| CHECK_VIDARBHA
    CHECK_VIDARBHA -->|Yes| VIDARBHA
    CHECK_VIDARBHA -->|No| CHECK_MAHA
    CHECK_MAHA -->|Yes| MAHA
    CHECK_MAHA -->|No| OUTSIDE

    FREE --> DISPLAY
    MUMBAI --> DISPLAY
    PUNE --> DISPLAY
    NASHIK --> DISPLAY
    AURANG --> DISPLAY
    VIDARBHA --> DISPLAY
    MAHA --> DISPLAY
    OUTSIDE --> DISPLAY
```

## 6. Authentication Flow

```mermaid
graph TB
    VISITOR([Visitor])

    subgraph "Authentication Options"
        LOGIN_PAGE[Login Page]
        SIGNUP_PAGE[Signup Page]
    end

    subgraph "Login Methods"
        EMAIL_LOGIN[Email/Password]
        GOOGLE_LOGIN[Google OAuth]
    end

    subgraph "Firebase Auth"
        AUTH_SERVICE[Firebase Authentication]
        FIRESTORE[Firestore Database]
    end

    subgraph "User States"
        AUTHENTICATED[Authenticated User]
        PROFILE_PAGE[Profile Page]
        ADMIN_ACCESS{Admin?}
        ADMIN_PAGE[Admin Dashboard]
        USER_FEATURES[User Features]
    end

    VISITOR --> LOGIN_PAGE
    VISITOR --> SIGNUP_PAGE

    LOGIN_PAGE --> EMAIL_LOGIN
    LOGIN_PAGE --> GOOGLE_LOGIN
    SIGNUP_PAGE --> EMAIL_LOGIN
    SIGNUP_PAGE --> GOOGLE_LOGIN

    EMAIL_LOGIN --> AUTH_SERVICE
    GOOGLE_LOGIN --> AUTH_SERVICE

    AUTH_SERVICE --> FIRESTORE
    FIRESTORE --> AUTHENTICATED

    AUTHENTICATED --> PROFILE_PAGE
    AUTHENTICATED --> ADMIN_ACCESS
    ADMIN_ACCESS -->|Yes| ADMIN_PAGE
    ADMIN_ACCESS -->|No| USER_FEATURES
```

## 7. Complete Page Routes

```mermaid
graph LR
    ROOT["/"]

    subgraph "Public Pages"
        HOME["/"]
        ABOUT_P["/about"]
        CONTACT_P["/contact"]
        MARKET_P["/marketplace"]
        CHECKOUT_P["/marketplace/checkout"]
        PROJECTS_P["/projects"]
        TRACK_P["/tracking"]
        TROUBLE_P["/troubleshooting-service"]
        SUMM_P["/summarizer"]
    end

    subgraph "Auth Pages"
        LOGIN_P["/login"]
        SIGNUP_P["/signup"]
        PROFILE_P["/profile"]
    end

    subgraph "Custom Services"
        CUSTOM_PROJ_P["/custom-project"]
        CUSTOM_PRES_P["/custom-presentation"]
    end

    subgraph "Admin"
        ADMIN_P["/admin"]
    end

    ROOT --> HOME
    ROOT --> ABOUT_P
    ROOT --> CONTACT_P
    ROOT --> MARKET_P
    MARKET_P --> CHECKOUT_P
    ROOT --> PROJECTS_P
    ROOT --> TRACK_P
    ROOT --> TROUBLE_P
    ROOT --> SUMM_P
    ROOT --> LOGIN_P
    ROOT --> SIGNUP_P
    ROOT --> PROFILE_P
    ROOT --> CUSTOM_PROJ_P
    ROOT --> CUSTOM_PRES_P
    ROOT --> ADMIN_P
```

## 8. Order Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant Marketplace
    participant CartDrawer
    participant CartContext
    participant DeliveryLib
    participant CheckoutPage
    participant Formspree
    participant Email

    User->>Marketplace: Browse Products
    User->>Marketplace: Add to Cart
    Marketplace->>CartContext: add(product, qty)
    CartContext->>CartContext: Update items[]
    CartContext->>CartContext: Calculate subtotal

    User->>CartDrawer: Open Cart
    CartDrawer->>User: Show cart items

    User->>CartDrawer: Enter Pincode
    CartDrawer->>DeliveryLib: getDeliveryCharge(pincode)
    DeliveryLib->>DeliveryLib: getRegion(pincode)
    DeliveryLib->>DeliveryLib: Calculate charge
    DeliveryLib->>CartContext: Set deliveryCharge

    CartContext->>CartContext: Check if subtotal < ₹100
    CartContext->>CartContext: Set smallCartFee (₹50 or ₹0)
    CartContext->>CartContext: Calculate total

    CartDrawer->>User: Show total with fees

    User->>CartDrawer: Click Proceed to Checkout
    CartDrawer->>CheckoutPage: Navigate

    CheckoutPage->>User: Show order summary & form
    User->>CheckoutPage: Fill customer info
    User->>CheckoutPage: Select Cash on Delivery
    User->>CheckoutPage: Submit Order

    CheckoutPage->>Formspree: POST order data
    Note over CheckoutPage,Formspree: Includes: customer info,<br/>items, subtotal,<br/>smallCartFee, deliveryCharge,<br/>total, pincode

    Formspree->>Email: Send notification
    Formspree->>CheckoutPage: Success response
    CheckoutPage->>User: Show success page
```

## Key Features Summary

### 1. **Marketplace System**

- Product browsing with filters
- Shopping cart with real-time updates
- Regional delivery pricing
- Small cart fee for orders < ₹100

### 2. **Delivery Pricing**

- Free delivery for 8 specific pincodes
- Regional rates for Maharashtra
- ₹100-₹350 based on location

### 3. **Fee Structure**

- Small cart fee: ₹50 for orders < ₹100
- Delivery charges: ₹0-₹350 based on region
- Dynamic total calculation

### 4. **Order Management**

- Formspree integration for order emails
- Complete order metadata tracking
- Cash on Delivery payment

### 5. **Additional Services**

- Project showcase and custom projects
- Order tracking system
- AI-powered troubleshooting
- Document summarizer
- Admin dashboard

### 6. **Tech Stack**

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Forms**: Formspree, EmailJS
- **Analytics**: Google Analytics
- **State**: React Context API
