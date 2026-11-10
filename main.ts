/**
 * EaseStay Luxury Hotel & Resort
 * Main TypeScript Controller
 */

// Types & Interfaces
export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'suite' | 'executive' | 'villa' | 'penthouse';
  pricePerNight: number;
  capacity: {
    adults: number;
    children: number;
  };
  size: string;
  bed: string;
  image: string;
  badge: string;
  description: string;
  amenities: string[];
}

export interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalTime: string;
  specialRequests?: string;
  accessibilityNeeds: string[];
}

export interface BookingDetails {
  bookingId?: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: string;
  totalNights: number;
  roomSubtotal: number;
  addOnsTotal: number;
  taxesAndFees: number;
  grandTotal: number;
  guest?: GuestInfo;
  selectedAddOns?: string[];
  paymentPreference?: string;
}

export interface GalleryPhoto {
  src: string;
  title: string;
  category: string;
}

// Room Catalog Data (6 Luxury Suites & Accommodations)
export const ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Superior Double Room',
    category: 'deluxe',
    pricePerNight: 149,
    capacity: { adults: 2, children: 1 },
    size: '38 m²',
    bed: '1 King or 2 Twin Beds',
    image: 'r1.jpg',
    badge: 'Popular Choice',
    description: 'Generously proportioned with sweeping coastal views, plush Egyptian cotton linens, and a marble bath with rainfall shower.',
    amenities: ['Ocean View', 'Free High-Speed Wi-Fi', 'Espresso Bar']
  },
  {
    id: 'room-2',
    name: 'Executive Garden Suite',
    category: 'suite',
    pricePerNight: 239,
    capacity: { adults: 3, children: 2 },
    size: '54 m²',
    bed: '1 California King Bed',
    image: 'r2.jpg',
    badge: 'Best Seller',
    description: 'An elegant personal sanctuary featuring a private garden terrace, separate lounge space, and complimentary evening aperitifs.',
    amenities: ['Garden Terrace', 'Deep Soaking Tub', 'Butler Call']
  },
  {
    id: 'room-3',
    name: 'Presidential Ocean Suite',
    category: 'executive',
    pricePerNight: 389,
    capacity: { adults: 4, children: 2 },
    size: '85 m²',
    bed: '2 King Beds',
    image: 'r3.jpg',
    badge: 'Signature Luxury',
    description: 'Our premier penthouse suite offering 180° panoramic ocean vistas, dedicated butler service, and private jacuzzi lounge.',
    amenities: ['Private Jacuzzi', '180° Ocean View', 'VIP Chauffeur']
  },
  {
    id: 'room-4',
    name: 'Deluxe Oceanfront Villa',
    category: 'villa',
    pricePerNight: 499,
    capacity: { adults: 4, children: 2 },
    size: '110 m²',
    bed: '2 King Beds + Plunge Pool',
    image: 'home1.jpg',
    badge: 'Exclusive Villa',
    description: 'A standalone seaside villa with its own infinity plunge pool, private sundeck, outdoor shower, and private chef service.',
    amenities: ['Private Plunge Pool', 'Direct Beach Access', 'Personal Chef']
  },
  {
    id: 'room-5',
    name: 'Honeymoon Garden Sanctuary',
    category: 'suite',
    pricePerNight: 289,
    capacity: { adults: 2, children: 0 },
    size: '62 m²',
    bed: 'Canopy King Bed',
    image: 'home2.jpg',
    badge: 'Romantic Getaway',
    description: 'Designed exclusively for romance, featuring secluded tropical foliage, a freestanding copper bath, and candlelit turndown rituals.',
    amenities: ['Copper Soaking Tub', 'Champagne on Arrival', 'Private Patio']
  },
  {
    id: 'room-6',
    name: 'Penthouse Sky Terrace',
    category: 'penthouse',
    pricePerNight: 599,
    capacity: { adults: 6, children: 3 },
    size: '140 m²',
    bed: '3 Master En-Suites',
    image: 'home4.jpg',
    badge: 'Ultra Luxury',
    description: 'Commanding the top floor with wrap-around balconies, private rooftop solarium, cocktail lounge bar, and 24/7 dedicated concierge.',
    amenities: ['Rooftop Solarium', 'Cocktail Lounge Bar', '24/7 Concierge']
  }
];

// Gallery Photos Data
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: 'g1.jpg', title: 'Infinity Coastal Pool & Cabanas', category: 'leisure' },
  { src: 'g2.jpg', title: 'Executive Master Suite Living Space', category: 'rooms' },
  { src: 'g3.jpg', title: 'Secluded White Sand Beachfront', category: 'leisure' },
  { src: 'g4.jpg', title: 'Artisan Dining & Sunset Lounge', category: 'dining' },
  { src: 'g5.jpg', title: 'Thalasso Spa & Hydrotherapy Pool', category: 'leisure' },
  { src: 'g6.jpg', title: 'Oceanfront Evening Terrace', category: 'dining' },
  { src: 'g7.jpg', title: 'Tropical Botanical Walkway', category: 'leisure' },
  { src: 'g8.jpg', title: 'Panoramic Ocean Sunrise Horizon', category: 'rooms' }
];

// 1. Navigation Manager
export class NavigationManager {
  private header: HTMLElement | null;
  private hamburger: HTMLElement | null;
  private navMenu: HTMLElement | null;
  private navLinks: NodeListOf<HTMLAnchorElement>;

  constructor() {
    this.header = document.getElementById('navigation-menu');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  private init(): void {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    this.handleScroll();
  }

  private toggleMenu(): void {
    if (!this.hamburger || !this.navMenu) return;
    const isActive = this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    this.hamburger.setAttribute('aria-expanded', String(isActive));
  }

  private closeMenu(): void {
    if (!this.hamburger || !this.navMenu) return;
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
  }

  private handleScroll(): void {
    if (!this.header) return;
    if (window.scrollY > 40) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
}

// 2. Hero Background Slider
export class HeroSlider {
  private heroImage: HTMLImageElement | null;
  private thumbnails: NodeListOf<HTMLImageElement>;
  private currentIndex: number = 0;
  private images: string[] = ['home1.jpg', 'home2.jpg', 'home3.jpg', 'home4.jpg'];
  private intervalId: number | null = null;

  constructor() {
    this.heroImage = document.querySelector('.hero-bg-img');
    this.thumbnails = document.querySelectorAll('.hero-thumb');

    this.init();
  }

  private init(): void {
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.setImage(index);
        this.restartAutoSlide();
      });
    });

    this.startAutoSlide();
  }

  public setImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    this.currentIndex = index;

    if (this.heroImage) {
      this.heroImage.classList.add('fade-out');
      setTimeout(() => {
        if (this.heroImage) {
          this.heroImage.src = this.images[this.currentIndex];
          this.heroImage.classList.remove('fade-out');
        }
      }, 250);
    }

    this.thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === this.currentIndex);
    });
  }

  private next(): void {
    const nextIdx = (this.currentIndex + 1) % this.images.length;
    this.setImage(nextIdx);
  }

  private startAutoSlide(): void {
    this.intervalId = window.setInterval(() => this.next(), 6000);
  }

  private restartAutoSlide(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
    this.startAutoSlide();
  }
}

// 3. Restaurant Accordion
export class AccordionManager {
  private accordionItems: NodeListOf<HTMLElement>;

  constructor() {
    this.accordionItems = document.querySelectorAll('.accordionItem');
    this.init();
  }

  private init(): void {
    this.accordionItems.forEach((item) => {
      const heading = item.querySelector('.accordionIHeading');
      if (heading) {
        heading.addEventListener('click', () => this.toggle(item));
      }
    });
  }

  private toggle(clickedItem: HTMLElement): void {
    const isOpen = clickedItem.classList.contains('open');

    // Close all other items
    this.accordionItems.forEach((item) => {
      item.classList.remove('open');
      item.classList.add('close');
      const heading = item.querySelector('.accordionIHeading');
      if (heading) heading.setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked item
    if (!isOpen) {
      clickedItem.classList.add('open');
      clickedItem.classList.remove('close');
      const heading = clickedItem.querySelector('.accordionIHeading');
      if (heading) heading.setAttribute('aria-expanded', 'true');
    }
  }
}

// 4. Comprehensive Booking Engine
export class BookingEngine {
  private form: HTMLFormElement | null;
  private checkInInput: HTMLInputElement | null;
  private checkOutInput: HTMLInputElement | null;
  private adultsInput: HTMLInputElement | null;
  private childrenInput: HTMLInputElement | null;
  private roomSelect: HTMLSelectElement | null;
  private modal: HTMLElement | null;

  constructor() {
    this.form = document.getElementById('bookingForm') as HTMLFormElement;
    this.checkInInput = document.getElementById('checkin') as HTMLInputElement;
    this.checkOutInput = document.getElementById('checkout') as HTMLInputElement;
    this.adultsInput = document.getElementById('adults') as HTMLInputElement;
    this.childrenInput = document.getElementById('children') as HTMLInputElement;
    this.roomSelect = document.getElementById('roomType') as HTMLSelectElement;
    this.modal = document.getElementById('bookingModal');

    this.init();
  }

  private init(): void {
    this.setupDates();

    if (this.checkInInput) {
      this.checkInInput.addEventListener('change', () => this.handleCheckInChange());
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    this.setupModalDismiss();
  }

  private setupDates(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = this.formatDate(today);
    const tomorrowStr = this.formatDate(tomorrow);

    if (this.checkInInput) {
      this.checkInInput.min = todayStr;
      this.checkInInput.value = todayStr;
    }

    if (this.checkOutInput) {
      this.checkOutInput.min = tomorrowStr;
      this.checkOutInput.value = tomorrowStr;
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private handleCheckInChange(): void {
    if (!this.checkInInput || !this.checkOutInput) return;
    const checkInDate = new Date(this.checkInInput.value);
    if (isNaN(checkInDate.getTime())) return;

    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const minCheckOutStr = this.formatDate(nextDay);

    this.checkOutInput.min = minCheckOutStr;

    if (new Date(this.checkOutInput.value) <= checkInDate) {
      this.checkOutInput.value = minCheckOutStr;
    }
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    if (!this.checkInInput || !this.checkOutInput) return;

    const checkIn = new Date(this.checkInInput.value);
    const checkOut = new Date(this.checkOutInput.value);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      ToastNotification.show('Please select valid check-in and check-out dates.', 'warning');
      return;
    }

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const totalNights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

    const adults = parseInt(this.adultsInput?.value || '2', 10);
    const children = parseInt(this.childrenInput?.value || '0', 10);
    const selectedRoomId = this.roomSelect?.value || 'room-1';

    const selectedRoom = ROOMS.find(r => r.id === selectedRoomId) || ROOMS[0];
    const roomSubtotal = selectedRoom.pricePerNight * totalNights;
    const taxesAndFees = Math.round(roomSubtotal * 0.12);
    const grandTotal = roomSubtotal + taxesAndFees;

    this.openComprehensiveModal({
      checkIn: this.checkInInput.value,
      checkOut: this.checkOutInput.value,
      adults,
      children,
      roomId: selectedRoom.id,
      totalNights,
      roomSubtotal,
      addOnsTotal: 0,
      taxesAndFees,
      grandTotal
    }, selectedRoom);
  }

  public openComprehensiveModal(details: BookingDetails, room: Room): void {
    if (!this.modal) return;

    const body = this.modal.querySelector('.modal-body');
    if (!body) return;

    body.innerHTML = `
      <form id="modalReservationForm">
        <!-- Room Banner -->
        <div class="summary-room-header">
          <img src="${room.image}" alt="${room.name}" class="summary-thumb" />
          <div style="flex-grow: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span class="room-badge" style="position: static; display: inline-block; margin-bottom: 4px;">${room.badge}</span>
                <h3 style="color: var(--navy-900); font-size: 1.25rem;">${room.name}</h3>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 1.3rem; font-weight: 800; color: var(--navy-900);">$${room.pricePerNight}</span>
                <span style="font-size: 0.8rem; color: var(--slate-500); display: block;">/ night</span>
              </div>
            </div>
            <p class="summary-sub" style="margin-top: 4px;">${room.size} &bull; ${room.bed} &bull; Up to ${room.capacity.adults} Adults</p>
          </div>
        </div>

        <!-- 1. Itinerary & Guests Details -->
        <h4 class="booking-section-title"><i class="far fa-calendar-alt"></i> 1. Reservation Schedule & Guests</h4>
        <div class="booking-form-row col-3">
          <div class="booking-input-group">
            <label>Check-in Date</label>
            <input type="date" id="mCheckIn" value="${details.checkIn}" required />
          </div>
          <div class="booking-input-group">
            <label>Check-out Date</label>
            <input type="date" id="mCheckOut" value="${details.checkOut}" required />
          </div>
          <div class="booking-input-group">
            <label>Room Category</label>
            <select id="mRoomSelect">
              ${ROOMS.map(r => `<option value="${r.id}" ${r.id === room.id ? 'selected' : ''}>${r.name} ($${r.pricePerNight}/nt)</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="booking-form-row">
          <div class="booking-input-group">
            <label>Adult Guests (13+ yrs)</label>
            <input type="number" id="mAdults" min="1" max="6" value="${details.adults}" required />
          </div>
          <div class="booking-input-group">
            <label>Children (0 - 12 yrs)</label>
            <input type="number" id="mChildren" min="0" max="4" value="${details.children}" />
          </div>
        </div>

        <!-- 2. Primary Guest Information -->
        <h4 class="booking-section-title"><i class="far fa-user"></i> 2. Primary Guest Information</h4>
        <div class="booking-form-row">
          <div class="booking-input-group">
            <label>Full Name *</label>
            <input type="text" id="mGuestName" placeholder="e.g., Sarah Jenkins" required />
          </div>
          <div class="booking-input-group">
            <label>Email Address *</label>
            <input type="email" id="mGuestEmail" placeholder="sarah@example.com" required />
          </div>
        </div>

        <div class="booking-form-row">
          <div class="booking-input-group">
            <label>Phone / WhatsApp Number *</label>
            <input type="tel" id="mGuestPhone" placeholder="+1 (555) 019-2834" required />
          </div>
          <div class="booking-input-group">
            <label>Country of Residence</label>
            <input type="text" id="mGuestCountry" placeholder="United States" />
          </div>
        </div>

        <div class="booking-form-row">
          <div class="booking-input-group" style="grid-column: 1 / -1;">
            <label>Estimated Arrival Window</label>
            <select id="mArrivalTime">
              <option value="Standard Check-in (3:00 PM - 6:00 PM)">Standard Check-in (3:00 PM - 6:00 PM)</option>
              <option value="Early Arrival Request (12:00 PM - 3:00 PM)">Early Arrival Request (12:00 PM - 3:00 PM)</option>
              <option value="Late Evening Arrival (After 6:00 PM)">Late Evening Arrival (After 6:00 PM)</option>
            </select>
          </div>
        </div>

        <!-- 3. Universal Accessibility Preferences -->
        <h4 class="booking-section-title"><i class="fas fa-universal-access"></i> 3. Universal Accessibility Accommodations</h4>
        <p style="font-size: 0.82rem; color: var(--slate-500); margin-bottom: 10px;">Select any adaptive assistance required. EaseStay provides certified accessible accommodations at no extra cost.</p>
        <div class="accessibility-tags">
          <label class="access-tag-item">
            <input type="checkbox" name="accessibility" value="Wheelchair Accessible & Roll-in Shower" />
            <span>Wheelchair roll-in shower & wide doors</span>
          </label>
          <label class="access-tag-item">
            <input type="checkbox" name="accessibility" value="Step-free Ground Floor / Close to Elevator" />
            <span>Step-free floor close to elevators</span>
          </label>
          <label class="access-tag-item">
            <input type="checkbox" name="accessibility" value="Visual & Tactile Alert System" />
            <span>Visual strobe & tactile door alerts</span>
          </label>
          <label class="access-tag-item">
            <input type="checkbox" name="accessibility" value="Hypoallergenic & Fragrance-Free Setup" />
            <span>Hypoallergenic bedding & air purifier</span>
          </label>
        </div>

        <!-- 4. Optional Luxury Add-ons -->
        <h4 class="booking-section-title"><i class="fas fa-sparkles"></i> 4. Enhance Your Stay (Optional Add-ons)</h4>
        <div class="addons-grid">
          <label class="addon-card">
            <input type="checkbox" class="addon-checkbox" id="addonBreakfast" data-price="25" data-type="perPersonPerNight" />
            <div class="addon-card-info">
              <span class="addon-title">Artisan Breakfast Buffet</span>
              <span class="addon-desc">Daily farm-to-table gourmet breakfast</span>
              <span class="addon-price">+$25 / adult / night</span>
            </div>
          </label>

          <label class="addon-card">
            <input type="checkbox" class="addon-checkbox" id="addonChauffeur" data-price="60" data-type="flat" />
            <div class="addon-card-info">
              <span class="addon-title">VIP Airport Chauffeur</span>
              <span class="addon-desc">Roundtrip private luxury SUV transfer</span>
              <span class="addon-price">+$60 flat</span>
            </div>
          </label>

          <label class="addon-card">
            <input type="checkbox" class="addon-checkbox" id="addonSpa" data-price="45" data-type="perPerson" />
            <div class="addon-card-info">
              <span class="addon-title">Unlimited Thalasso Spa Pass</span>
              <span class="addon-desc">Access to hydrotherapy mineral baths</span>
              <span class="addon-price">+$45 / adult</span>
            </div>
          </label>

          <label class="addon-card">
            <input type="checkbox" class="addon-checkbox" id="addonChampagne" data-price="40" data-type="flat" />
            <div class="addon-card-info">
              <span class="addon-title">Champagne & Tropical Fruit Basket</span>
              <span class="addon-desc">Chilled bottle on arrival in suite</span>
              <span class="addon-price">+$40 flat</span>
            </div>
          </label>
        </div>

        <!-- 5. Special Requests -->
        <h4 class="booking-section-title"><i class="far fa-comment-dots"></i> 5. Special Requests & Dietary Notes</h4>
        <div class="booking-input-group" style="margin-bottom: 14px;">
          <textarea id="mSpecialRequests" rows="2" placeholder="Tell us about dietary preferences, high floor preferences, celebration details (anniversary/birthday), etc."></textarea>
        </div>

        <!-- 6. Payment Preference -->
        <h4 class="booking-section-title"><i class="far fa-credit-card"></i> 6. Payment & Guarantee Preference</h4>
        <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 18px; font-size: 0.88rem;">
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 8px;">
            <input type="radio" name="paymentOption" value="arrival" checked style="accent-color: var(--primary-gold-dark);" />
            <span><strong>Pay upon arrival at resort</strong> &bull; Zero upfront deposit required</span>
          </label>
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
            <input type="radio" name="paymentOption" value="card" style="accent-color: var(--primary-gold-dark);" />
            <span><strong>Card guarantee hold</strong> &bull; Pay nothing until checkout</span>
          </label>
        </div>

        <!-- 7. Live Pricing Calculation -->
        <div class="price-breakdown-box">
          <div class="price-row">
            <span id="priceLabelRoom">${room.name} (${details.totalNights} night${details.totalNights > 1 ? 's' : ''}):</span>
            <strong id="priceValRoom">$${details.roomSubtotal}</strong>
          </div>
          <div class="price-row">
            <span>Selected Add-on Experiences:</span>
            <strong id="priceValAddons">$0</strong>
          </div>
          <div class="price-row">
            <span>Resort Service Fee & Taxes (12%):</span>
            <strong id="priceValTaxes">$${details.taxesAndFees}</strong>
          </div>
          <div class="price-row grand-total">
            <span>Total Payable at Check-in:</span>
            <strong id="priceValGrandTotal">$${details.grandTotal}</strong>
          </div>
        </div>

        <!-- Submission Buttons -->
        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
          <button type="submit" class="btn btn-primary" style="width: 100%; height: 50px; font-size: 1rem;">
            <i class="fas fa-lock"></i> Confirm Luxury Reservation
          </button>
          <p style="text-align: center; font-size: 0.8rem; color: var(--slate-500);">
            <i class="fas fa-shield-alt" style="color: #10b981;"></i> Best Rate Guarantee &bull; Free cancellation up to 48 hours before check-in.
          </p>
        </div>
      </form>
    `;

    this.modal.classList.add('open');
    this.bindModalFormListeners(details, room);
  }

  private bindModalFormListeners(initialDetails: BookingDetails, currentRoom: Room): void {
    let activeRoom = currentRoom;
    const form = document.getElementById('modalReservationForm') as HTMLFormElement;
    if (!form) return;

    const inCheckIn = form.querySelector('#mCheckIn') as HTMLInputElement;
    const inCheckOut = form.querySelector('#mCheckOut') as HTMLInputElement;
    const inRoomSelect = form.querySelector('#mRoomSelect') as HTMLSelectElement;
    const inAdults = form.querySelector('#mAdults') as HTMLInputElement;
    const addonCheckboxes = form.querySelectorAll('.addon-checkbox') as NodeListOf<HTMLInputElement>;

    // Price calculation recalculator
    const recalculate = () => {
      const cIn = new Date(inCheckIn.value);
      const cOut = new Date(inCheckOut.value);
      const nights = (!isNaN(cIn.getTime()) && !isNaN(cOut.getTime()) && cOut > cIn)
        ? Math.round((cOut.getTime() - cIn.getTime()) / (1000 * 60 * 60 * 24))
        : 1;

      const adultsCount = parseInt(inAdults.value || '2', 10);
      const selectedId = inRoomSelect.value;
      activeRoom = ROOMS.find(r => r.id === selectedId) || activeRoom;

      const roomSubtotal = activeRoom.pricePerNight * nights;

      let addOnsTotal = 0;
      addonCheckboxes.forEach((cb) => {
        if (cb.checked) {
          const price = parseFloat(cb.getAttribute('data-price') || '0');
          const type = cb.getAttribute('data-type');
          if (type === 'perPersonPerNight') {
            addOnsTotal += price * adultsCount * nights;
          } else if (type === 'perPerson') {
            addOnsTotal += price * adultsCount;
          } else {
            addOnsTotal += price;
          }
        }
      });

      const taxes = Math.round((roomSubtotal + addOnsTotal) * 0.12);
      const grand = roomSubtotal + addOnsTotal + taxes;

      const elLabel = document.getElementById('priceLabelRoom');
      const elRoom = document.getElementById('priceValRoom');
      const elAddons = document.getElementById('priceValAddons');
      const elTaxes = document.getElementById('priceValTaxes');
      const elGrand = document.getElementById('priceValGrandTotal');

      if (elLabel) elLabel.textContent = `${activeRoom.name} (${nights} night${nights > 1 ? 's' : ''}):`;
      if (elRoom) elRoom.textContent = `$${roomSubtotal}`;
      if (elAddons) elAddons.textContent = `$${addOnsTotal}`;
      if (elTaxes) elTaxes.textContent = `$${taxes}`;
      if (elGrand) elGrand.textContent = `$${grand}`;

      return { nights, roomSubtotal, addOnsTotal, taxes, grand, adultsCount };
    };

    inCheckIn.addEventListener('change', recalculate);
    inCheckOut.addEventListener('change', recalculate);
    inRoomSelect.addEventListener('change', recalculate);
    inAdults.addEventListener('change', recalculate);
    addonCheckboxes.forEach(cb => cb.addEventListener('change', recalculate));

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = (document.getElementById('mGuestName') as HTMLInputElement)?.value.trim();
      const guestEmail = (document.getElementById('mGuestEmail') as HTMLInputElement)?.value.trim();
      const guestPhone = (document.getElementById('mGuestPhone') as HTMLInputElement)?.value.trim();
      const guestCountry = (document.getElementById('mGuestCountry') as HTMLInputElement)?.value.trim() || 'Not specified';
      const arrivalTime = (document.getElementById('mArrivalTime') as HTMLSelectElement)?.value;
      const specialRequests = (document.getElementById('mSpecialRequests') as HTMLTextAreaElement)?.value.trim();

      if (!guestName || !guestEmail || !guestPhone) {
        ToastNotification.show('Please fill in your Name, Email, and Phone number.', 'warning');
        return;
      }

      const accessNeeds: string[] = [];
      const accessCbs = form.querySelectorAll('input[name="accessibility"]:checked') as NodeListOf<HTMLInputElement>;
      accessCbs.forEach(cb => accessNeeds.push(cb.value));

      const selectedAddOnNames: string[] = [];
      addonCheckboxes.forEach(cb => {
        if (cb.checked) {
          const title = cb.closest('.addon-card')?.querySelector('.addon-title')?.textContent || 'Add-on';
          selectedAddOnNames.push(title);
        }
      });

      const calc = recalculate();
      const randomCode = 'ES-' + Math.floor(10000 + Math.random() * 90000);

      this.showVoucherReceipt({
        bookingId: randomCode,
        checkIn: inCheckIn.value,
        checkOut: inCheckOut.value,
        adults: calc.adultsCount,
        children: parseInt((document.getElementById('mChildren') as HTMLInputElement)?.value || '0', 10),
        roomId: activeRoom.id,
        totalNights: calc.nights,
        roomSubtotal: calc.roomSubtotal,
        addOnsTotal: calc.addOnsTotal,
        taxesAndFees: calc.taxes,
        grandTotal: calc.grand,
        guest: {
          fullName: guestName,
          email: guestEmail,
          phone: guestPhone,
          country: guestCountry,
          arrivalTime: arrivalTime,
          specialRequests: specialRequests,
          accessibilityNeeds: accessNeeds
        },
        selectedAddOns: selectedAddOnNames
      }, activeRoom);
    });
  }

  private showVoucherReceipt(booking: BookingDetails, room: Room): void {
    if (!this.modal) return;
    const body = this.modal.querySelector('.modal-body');
    if (!body) return;

    body.innerHTML = `
      <div class="booking-voucher">
        <div class="voucher-badge"><i class="fas fa-check"></i></div>
        <h3 class="voucher-title">Reservation Confirmed!</h3>
        <p style="color: var(--slate-600); font-size: 0.95rem; margin-bottom: 8px;">
          Thank you, <strong>${booking.guest?.fullName}</strong>. Your stay at EaseStay is locked in.
        </p>
        <div class="voucher-ref">Booking Ref: ${booking.bookingId}</div>

        <div class="voucher-grid">
          <div class="voucher-item">
            <span class="v-label">Reserved Suite</span>
            <span class="v-val">${room.name}</span>
          </div>
          <div class="voucher-item">
            <span class="v-label">Dates & Nights</span>
            <span class="v-val">${booking.checkIn} &rarr; ${booking.checkOut} (${booking.totalNights} nights)</span>
          </div>
          <div class="voucher-item">
            <span class="v-label">Guest Count</span>
            <span class="v-val">${booking.adults} Adults${booking.children > 0 ? `, ${booking.children} Kids` : ''}</span>
          </div>
          <div class="voucher-item">
            <span class="v-label">Contact Email</span>
            <span class="v-val">${booking.guest?.email}</span>
          </div>
          <div class="voucher-item">
            <span class="v-label">Contact Phone</span>
            <span class="v-val">${booking.guest?.phone}</span>
          </div>
          <div class="voucher-item">
            <span class="v-label">Arrival Window</span>
            <span class="v-val">${booking.guest?.arrivalTime}</span>
          </div>
          ${booking.guest?.accessibilityNeeds && booking.guest.accessibilityNeeds.length > 0 ? `
            <div class="voucher-item" style="grid-column: 1 / -1;">
              <span class="v-label">Accessibility Accommodations</span>
              <span class="v-val" style="color: #10b981;"><i class="fas fa-universal-access"></i> ${booking.guest.accessibilityNeeds.join(' &bull; ')}</span>
            </div>
          ` : ''}
          ${booking.selectedAddOns && booking.selectedAddOns.length > 0 ? `
            <div class="voucher-item" style="grid-column: 1 / -1;">
              <span class="v-label">Selected Add-on Experiences</span>
              <span class="v-val">${booking.selectedAddOns.join(', ')}</span>
            </div>
          ` : ''}
          ${booking.guest?.specialRequests ? `
            <div class="voucher-item" style="grid-column: 1 / -1;">
              <span class="v-label">Special Requests</span>
              <span class="v-val" style="font-style: italic;">"${booking.guest.specialRequests}"</span>
            </div>
          ` : ''}
          <div class="voucher-item" style="grid-column: 1 / -1; border-top: 1px dashed var(--slate-300); padding-top: 10px; display: flex; justify-content: space-between; align-items: center;">
            <span class="v-label" style="font-size: 0.95rem; font-weight: 700; color: var(--navy-900);">Total Due at Check-in:</span>
            <span class="v-val" style="font-size: 1.5rem; color: var(--navy-900); font-weight: 800;">$${booking.grandTotal}</span>
          </div>
        </div>

        <div style="display: flex; gap: 14px; justify-content: center; margin-top: 20px;">
          <button type="button" class="btn btn-outline-gold" onclick="window.print()">
            <i class="fas fa-print"></i> Print Voucher
          </button>
          <button type="button" class="btn btn-primary" data-close-modal>
            Done
          </button>
        </div>
      </div>
    `;

    this.setupModalDismiss();
    ToastNotification.show(`Booking #${booking.bookingId} confirmed! Details sent to ${booking.guest?.email}`, 'success');
  }

  private setupModalDismiss(): void {
    if (!this.modal) return;
    const closeBtns = this.modal.querySelectorAll('[data-close-modal]');
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.modal?.classList.remove('open');
      });
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.modal.classList.remove('open');
      }
    });
  }
}

// 5. Rooms & Suites Carousel
export class RoomCarousel {
  private track: HTMLElement | null;
  private prevBtn: HTMLButtonElement | null;
  private nextBtn: HTMLButtonElement | null;
  private dotsContainer: HTMLElement | null;
  private cards: NodeListOf<HTMLElement>;
  private currentIndex: number = 0;
  private itemsPerView: number = 3;
  private maxIndex: number = 0;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor() {
    this.track = document.querySelector('.rooms-carousel-track');
    this.prevBtn = document.querySelector('.rooms-prev-btn');
    this.nextBtn = document.querySelector('.rooms-next-btn');
    this.dotsContainer = document.querySelector('.rooms-carousel-dots');
    this.cards = document.querySelectorAll('.rooms-carousel-track .room-card');

    this.init();
  }

  private init(): void {
    if (!this.track || this.cards.length === 0) return;

    this.updateItemsPerView();
    this.renderDots();
    this.updateSlidePosition();

    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    window.addEventListener('resize', () => {
      this.updateItemsPerView();
      this.renderDots();
      this.updateSlidePosition();
    });

    // Touch swipe support
    this.track.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });
  }

  private updateItemsPerView(): void {
    const width = window.innerWidth;
    if (width <= 640) {
      this.itemsPerView = 1;
    } else if (width <= 1024) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 3;
    }

    this.maxIndex = Math.max(0, this.cards.length - this.itemsPerView);
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }
  }

  public next(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back
    }
    this.updateSlidePosition();
  }

  public prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.maxIndex; // Loop to end
    }
    this.updateSlidePosition();
  }

  public goTo(index: number): void {
    if (index < 0 || index > this.maxIndex) return;
    this.currentIndex = index;
    this.updateSlidePosition();
  }

  private handleSwipe(): void {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  private renderDots(): void {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';

    const dotCount = this.maxIndex + 1;
    if (dotCount <= 1) return;

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `carousel-dot ${i === this.currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  private updateSlidePosition(): void {
    if (!this.track || this.cards.length === 0) return;

    const firstCard = this.cards[0];
    const cardRect = firstCard.getBoundingClientRect();
    const gap = 24;
    const shift = this.currentIndex * (cardRect.width + gap);

    this.track.style.transform = `translateX(-${shift}px)`;

    // Update active dot
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }
  }
}

// 6. Interactive Photo Gallery & Fullscreen Lightbox
export class GalleryManager {
  private items: NodeListOf<HTMLElement>;
  private filterButtons: NodeListOf<HTMLButtonElement>;
  private lightbox: HTMLElement | null;
  private lightboxImg: HTMLImageElement | null;
  private lightboxTitle: HTMLElement | null;
  private lightboxCounter: HTMLElement | null;
  private currentActiveIndex: number = 0;
  private visibleItems: HTMLElement[] = [];

  constructor() {
    this.items = document.querySelectorAll('.gallery-item');
    this.filterButtons = document.querySelectorAll('.gallery-filter-btn');
    this.lightbox = document.getElementById('galleryLightbox');
    this.lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement;
    this.lightboxTitle = document.getElementById('lightboxTitle');
    this.lightboxCounter = document.getElementById('lightboxCounter');

    this.init();
  }

  private init(): void {
    this.updateVisibleItems();

    // Click on photo items to open lightbox
    this.items.forEach((item) => {
      item.addEventListener('click', () => {
        const index = this.visibleItems.indexOf(item);
        if (index !== -1) {
          this.openLightbox(index);
        }
      });
    });

    // Category filter tabs
    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter') || 'all';

        this.filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        this.filterPhotos(category);
      });
    });

    // Lightbox Controls
    if (this.lightbox) {
      const closeBtn = this.lightbox.querySelector('.lightbox-close');
      const prevBtn = this.lightbox.querySelector('.lightbox-prev');
      const nextBtn = this.lightbox.querySelector('.lightbox-next');

      if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
      if (prevBtn) prevBtn.addEventListener('click', () => this.prevPhoto());
      if (nextBtn) nextBtn.addEventListener('click', () => this.nextPhoto());

      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });

      // Keyboard navigation
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (!this.lightbox?.classList.contains('open')) return;
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.prevPhoto();
        if (e.key === 'ArrowRight') this.nextPhoto();
      });
    }
  }

  private updateVisibleItems(): void {
    this.visibleItems = Array.from(this.items).filter((el) => el.style.display !== 'none');
  }

  private filterPhotos(category: string): void {
    this.items.forEach((item) => {
      const itemCat = item.getAttribute('data-category');
      if (category === 'all' || itemCat === category) {
        item.style.display = 'block';
        setTimeout(() => item.classList.add('visible'), 20);
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
      }
    });

    this.updateVisibleItems();
  }

  public openLightbox(index: number): void {
    if (!this.lightbox || !this.visibleItems[index]) return;
    this.currentActiveIndex = index;
    this.displayPhoto(index);
    this.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  public closeLightbox(): void {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  private nextPhoto(): void {
    if (this.visibleItems.length === 0) return;
    this.currentActiveIndex = (this.currentActiveIndex + 1) % this.visibleItems.length;
    this.displayPhoto(this.currentActiveIndex);
  }

  private prevPhoto(): void {
    if (this.visibleItems.length === 0) return;
    this.currentActiveIndex = (this.currentActiveIndex - 1 + this.visibleItems.length) % this.visibleItems.length;
    this.displayPhoto(this.currentActiveIndex);
  }

  private displayPhoto(index: number): void {
    const item = this.visibleItems[index];
    if (!item || !this.lightboxImg) return;

    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || img?.alt || 'Resort Photo';

    this.lightboxImg.classList.add('fade-anim');
    this.lightboxImg.src = img?.src || '';
    this.lightboxImg.alt = title;

    setTimeout(() => {
      this.lightboxImg?.classList.remove('fade-anim');
    }, 250);

    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = title;
    }

    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${index + 1} of ${this.visibleItems.length}`;
    }
  }
}

// 6. Toast Notification System
export class ToastNotification {
  public static show(message: string, type: 'success' | 'warning' | 'info' = 'info'): void {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    
    const icon = type === 'success' 
      ? 'fa-check-circle' 
      : type === 'warning' 
      ? 'fa-exclamation-triangle' 
      : 'fa-info-circle';

    toast.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}

// 7. Room Modal & Booking Trigger
export function setupRoomCardListeners(): void {
  const roomButtons = document.querySelectorAll('[data-book-room]');
  const roomSelect = document.getElementById('roomType') as HTMLSelectElement | null;
  const bookingSection = document.getElementById('booking');

  roomButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const roomId = target.getAttribute('data-book-room');
      
      if (roomSelect && roomId) {
        roomSelect.value = roomId;
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        bookingSection.classList.add('highlight-pulse');
        setTimeout(() => bookingSection.classList.remove('highlight-pulse'), 1200);
      }
    });
  });
}

// 8. General Interactive Form Handlers (Contact & Newsletter)
export function setupForms(): void {
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]') as HTMLInputElement;
      if (input && input.value) {
        ToastNotification.show(`Thank you! ${input.value} has been subscribed to our luxury club offers.`, 'success');
        input.value = '';
      }
    });
  }
}

// Document Ready Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  new NavigationManager();
  new HeroSlider();
  new AccordionManager();
  new BookingEngine();
  new RoomCarousel();
  new GalleryManager();
  setupRoomCardListeners();
  setupForms();
});
