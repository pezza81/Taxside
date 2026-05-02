import React, { useState, useRef } from 'react';
import './App.css';
import LandingPage from './LandingPage';

const receiptCategories = ['Travel', 'Equipment', 'Software', 'Marketing', 'Meals', 'Office', 'Professional', 'Training', 'Personal', 'Unknown'];
const journeyPurposeOptions = ['Client visit', 'Business meeting', 'Training', 'Site visit', 'Other'];
const expenseLibraryTradeFilters = ['All', 'Freelancer', 'Tradesperson', 'Driver', 'Creative', 'Consultant'];
const expenseLibraryGroups = [
  {
    title: 'Travel',
    emoji: '🚗',
    items: [
      { name: 'Mileage at 45p/mile', description: 'HMRC approved mileage allowance for business journeys.', tags: ['Driver', 'Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Fuel for business journeys', description: 'Petrol or diesel used in business vehicles.', tags: ['Driver', 'Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Parking fees', description: 'Business parking charges while working or meeting clients.', tags: ['Driver', 'Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Public transport', description: 'Train, bus or tube costs for business travel.', tags: ['Freelancer', 'Consultant', 'Creative'] },
      { name: 'Hotel stays for work', description: 'Overnight accommodation when away from home for business.', tags: ['Freelancer', 'Consultant'] },
      { name: 'Tolls and congestion charge', description: 'Road tolls and congestion costs incurred on business journeys.', tags: ['Driver', 'Freelancer', 'Tradesperson', 'Consultant'] },
    ],
  },
  {
    title: 'Technology',
    emoji: '💻',
    items: [
      { name: 'Laptop and computers', description: 'Business computers and hardware needed for work.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Mobile phone', description: 'Phone costs for business calls and communications.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Software subscriptions', description: 'Monthly or annual software tools used for business.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Internet connection', description: 'Portion of broadband costs used for business.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Domain names and hosting', description: 'Online presence costs for your business website.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Cloud storage', description: 'Cloud tools and storage used to support your business.', tags: ['Freelancer', 'Creative', 'Consultant'] },
    ],
  },
  {
    title: 'Home Office',
    emoji: '🏠',
    items: [
      { name: '£6 per week flat rate', description: 'HMRC simplified flat rate for home working expenses.', tags: ['Freelancer', 'Consultant', 'Creative'] },
      { name: 'Proportion of household bills', description: 'Share of bills used for business from home.', tags: ['Freelancer', 'Consultant', 'Creative'] },
      { name: 'Broadband', description: 'Internet costs required to run your business from home.', tags: ['Freelancer', 'Consultant', 'Creative'] },
      { name: 'Dedicated office equipment', description: 'Desk, chair and office equipment for home working.', tags: ['Freelancer', 'Consultant', 'Creative'] },
    ],
  },
  {
    title: 'Professional Services',
    emoji: '👔',
    items: [
      { name: 'Accountant fees', description: 'Accountancy and tax preparation costs.', tags: ['Freelancer', 'Consultant', 'Creative'] },
      { name: 'Legal fees', description: 'Legal advice and contracts for your business.', tags: ['Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Professional memberships', description: 'Memberships in trade bodies and professional institutes.', tags: ['Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Business insurance', description: 'Insurance policies for business risks and liability.', tags: ['Freelancer', 'Tradesperson', 'Driver', 'Consultant'] },
      { name: 'Public liability insurance', description: 'Insurance protecting you from claims by members of the public.', tags: ['Freelancer', 'Tradesperson', 'Driver', 'Consultant'] },
    ],
  },
  {
    title: 'Marketing',
    emoji: '📣',
    items: [
      { name: 'Website design and hosting', description: 'Costs to build and host your business website.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Online advertising', description: 'Digital ads to promote your business.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Business cards', description: 'Printed cards to share your contact details.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Branded materials', description: 'Branded stationery and marketing merchandise.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Social media tools', description: 'Tools used to manage and promote your social presence.', tags: ['Freelancer', 'Creative', 'Consultant'] },
    ],
  },
  {
    title: 'Training',
    emoji: '📚',
    items: [
      { name: 'Courses related to your trade', description: 'Training that improves or maintains your business skills.', tags: ['Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Industry books and publications', description: 'Reference material for your trade or profession.', tags: ['Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Professional development', description: 'Workshops and training for business skills.', tags: ['Freelancer', 'Tradesperson', 'Consultant'] },
      { name: 'Coaching and mentoring', description: 'Advice and coaching to help your business grow.', tags: ['Freelancer', 'Tradesperson', 'Consultant'] },
    ],
  },
  {
    title: 'Health',
    emoji: '🏥',
    items: [
      { name: 'Private medical treatment', description: 'Medical care needed because of work duties.', tags: ['Tradesperson', 'Driver', 'Freelancer', 'Consultant'] },
      { name: 'Income protection insurance', description: 'Insurance covering income loss when unable to work.', tags: ['Tradesperson', 'Driver', 'Freelancer', 'Consultant'] },
      { name: 'Eye tests for screen workers', description: 'Eye tests required for people working with screens.', tags: ['Freelancer', 'Creative', 'Consultant'] },
      { name: 'Physio for physical trades', description: 'Physiotherapy needed because of physical work.', tags: ['Tradesperson', 'Driver'] },
    ],
  },
  {
    title: 'Equipment',
    emoji: '🔧',
    items: [
      { name: 'Tools and machinery', description: 'Equipment used to deliver your trade or service.', tags: ['Tradesperson', 'Driver', 'Freelancer'] },
      { name: 'Safety equipment', description: 'Protective gear needed for safe working.', tags: ['Tradesperson', 'Driver', 'Freelancer'] },
      { name: 'Uniforms and protective clothing', description: 'Work clothing and safety wear for your job.', tags: ['Tradesperson', 'Driver'] },
      { name: 'Specialist equipment', description: 'Specialised tools or equipment for your business.', tags: ['Tradesperson', 'Driver', 'Freelancer'] },
    ],
  },
];
const expenseLibraryCategoryMap = {
  Travel: 'Travel',
  Technology: 'Technology',
  'Home Office': 'Home Office',
  'Professional Services': 'Professional Services',
  Marketing: 'Marketing',
  Training: 'Training',
  Health: 'Health',
  Equipment: 'Equipment',
};

const mtdQuarters = [
  {
    label: 'Q1',
    dateRange: '6 Apr – 5 Jul',
    deadline: '7 Aug',
    status: 'submitted',
    badge: '✓ Submitted',
  },
  {
    label: 'Q2',
    dateRange: '6 Jul – 5 Oct',
    deadline: '7 Nov',
    status: 'due-soon',
    badge: '⚠️ Due Soon',
  },
  {
    label: 'Q3',
    dateRange: '6 Oct – 5 Jan',
    deadline: '7 Feb',
    status: 'upcoming',
    badge: 'Upcoming',
  },
  {
    label: 'Q4',
    dateRange: '6 Jan – 5 Apr',
    deadline: '7 May',
    status: 'upcoming',
    badge: 'Upcoming',
  },
];

const taxPlanningTabs = [
  { id: 'pension', label: '💰 Pension' },
  { id: 'shares', label: '📈 Shares & CGT' },
  { id: 'eis', label: '⚡ EIS & SEIS' },
  { id: 'avoid', label: '🎯 Tax to Avoid' },
];

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());
  const [expandedTransactions, setExpandedTransactions] = useState(new Set());
  const [businessIncomeTransactions, setBusinessIncomeTransactions] = useState(new Set());
  const [notBusinessIncomeReasons, setNotBusinessIncomeReasons] = useState(new Map());
  const [showPreview, setShowPreview] = useState(false);
  const [ocrError, setOcrError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [extractionWarning, setExtractionWarning] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [showMtdAlert, setShowMtdAlert] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);
  const [mileageModalOpen, setMileageModalOpen] = useState(false);
  const [askTaxAIModalOpen, setAskTaxAIModalOpen] = useState(false);
  const [taxPlanningOpen, setTaxPlanningOpen] = useState(false);
  const [taxPlanningTab, setTaxPlanningTab] = useState('pension');
  const [pensionMonthly, setPensionMonthly] = useState(200);
  const [expenseLibraryOpen, setExpenseLibraryOpen] = useState(false);
  const [expenseLibrarySearch, setExpenseLibrarySearch] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tradeType, setTradeType] = useState('Freelancer');
  const [taxYear, setTaxYear] = useState('2025-2026');
  const [vatRegistered, setVatRegistered] = useState(true);
  const [utrNumber, setUtrNumber] = useState('');
  const [mtdReminders, setMtdReminders] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [expenseAlerts, setExpenseAlerts] = useState(true);
  const [expenseLibraryFilter, setExpenseLibraryFilter] = useState('All');
  const [expenseLibraryExpanded, setExpenseLibraryExpanded] = useState(new Set());
  const [expenseLibraryToast, setExpenseLibraryToast] = useState(false);
  const expenseLibraryToastTimeout = useRef(null);
  const [journeyFrom, setJourneyFrom] = useState('');
  const [journeyTo, setJourneyTo] = useState('');
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().slice(0, 10));
  const [journeyMiles, setJourneyMiles] = useState('');
  const [journeyPurpose, setJourneyPurpose] = useState('Client visit');
  const [journeys, setJourneys] = useState([]);
  const [taxAIInput, setTaxAIInput] = useState('');
  const [taxAIMessages, setTaxAIMessages] = useState([]);
  const [receiptMerchant, setReceiptMerchant] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [receiptTotal, setReceiptTotal] = useState('');
  const [receiptCategory, setReceiptCategory] = useState('Unknown');
  const [receiptOcrProcessing, setReceiptOcrProcessing] = useState(false);
  const [receiptOcrProgress, setReceiptOcrProgress] = useState(0);
  const [receiptOcrError, setReceiptOcrError] = useState(null);
  const dropZoneRef = useRef(null);
  const receiptDropZoneRef = useRef(null);

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    dropZoneRef.current.style.borderColor = '#00D897';
    dropZoneRef.current.style.backgroundColor = 'rgba(0, 216, 151, 0.05)';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropZoneRef.current.style.borderColor = '#444';
    dropZoneRef.current.style.backgroundColor = 'transparent';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropZoneRef.current.style.borderColor = '#444';
    dropZoneRef.current.style.backgroundColor = 'transparent';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Parse CSV file
  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.join('\n');
  };

  const parseReceiptDetails = (text) => {
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    let merchant = '';
    for (const line of lines) {
      if (!/^(receipt|invoice|tax|subtotal|subtotal|total|amount|balance|date|time|cash|card|transaction|merchant|no\.?|tel|phone|fax|vat|thank you|thanks)$/i.test(line) && line.length > 1) {
        merchant = line;
        break;
      }
    }
    if (!merchant && lines.length > 0) {
      merchant = lines[0];
    }

    const dateRegex = /(\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}\b)|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*[ .-]?\d{1,2}(?:,? ?\d{2,4})?\b/i;
    const dateMatch = text.match(dateRegex);
    const receiptDate = dateMatch ? dateMatch[0] : '';

    const totalLabelRegex = /(?:total(?: amount)?[:\s]*£?\s*)([0-9]+(?:\.[0-9]{2})?)/i;
    const totalLabelMatch = text.match(totalLabelRegex);
    let receiptTotal = '';
    if (totalLabelMatch) {
      receiptTotal = totalLabelMatch[1];
    } else {
      const amountRegex = /£?\s*([0-9]+(?:\.[0-9]{2})?)/g;
      const amounts = [];
      let found;
      while ((found = amountRegex.exec(text)) !== null) {
        const value = parseFloat(found[1]);
        if (!Number.isNaN(value)) {
          amounts.push(value);
        }
      }
      if (amounts.length > 0) {
        receiptTotal = amounts.sort((a, b) => b - a)[0].toFixed(2);
      }
    }

    return {
      merchant,
      date: receiptDate,
      total: receiptTotal,
    };
  };

  const resetReceiptForm = () => {
    setReceiptMerchant('');
    setReceiptDate('');
    setReceiptTotal('');
    setReceiptCategory('Unknown');
    setReceiptOcrProcessing(false);
    setReceiptOcrProgress(0);
    setReceiptOcrError(null);
  };

  const resetJourneyForm = () => {
    setJourneyFrom('');
    setJourneyTo('');
    setJourneyDate(new Date().toISOString().slice(0, 10));
    setJourneyMiles('');
    setJourneyPurpose('Client visit');
  };

  const closeScanModal = () => {
    setScanModalOpen(false);
    resetReceiptForm();
  };

  const closeJourneyModal = () => {
    setJourneyModalOpen(false);
    resetJourneyForm();
  };

  const openJourneyFromMileage = () => {
    setMileageModalOpen(false);
    setJourneyModalOpen(true);
  };

  const closeMileageModal = () => {
    setMileageModalOpen(false);
  };

  const exportMileageCSV = () => {
    const totalMiles = journeys.reduce((sum, j) => sum + j.miles, 0);
    const totalAmount = journeys.reduce((sum, j) => sum + parseFloat(j.amount || 0), 0);
    const taxSaving = totalAmount * 0.2;
    
    const now = new Date();
    const dateGenerated = now.toLocaleDateString('en-GB');
    
    const metadataLines = [
      'HMRC Mileage Log - TaxSide Export',
      `Generated: ${dateGenerated}`,
      `Tax Year: ${taxYear}`,
      businessName ? `Business: ${businessName}` : '',
      '',
      'HMRC Approved Rate: 45p per mile',
      '',
    ];
    
    const headers = ['Date', 'From', 'To', 'Purpose', 'Miles', 'Amount (£)'];
    const rows = journeys.map((journey) => [
      escapeCSV(journey.date),
      escapeCSV(journey.from),
      escapeCSV(journey.to),
      escapeCSV(journey.purpose),
      escapeCSV(journey.miles.toFixed(2)),
      escapeCSV(journey.amount),
    ]);
    
    const totalsRow = [
      'TOTAL',
      '',
      '',
      '',
      escapeCSV(totalMiles.toFixed(2)),
      escapeCSV(totalAmount.toFixed(2)),
    ];
    
    const taxSavingRow = [
      'Estimated tax saving at 20%',
      '',
      '',
      '',
      '',
      escapeCSV(taxSaving.toFixed(2)),
    ];
    
    const csvContent = [
      ...metadataLines,
      headers.join(','),
      ...rows.map((row) => row.join(',')),
      '',
      totalsRow.join(','),
      taxSavingRow.join(','),
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `taxside-mileage-${taxYear.replace('-', '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeAskTaxAIModal = () => {
    setAskTaxAIModalOpen(false);
    setTaxAIInput('');
    setTaxAIMessages([]);
  };

  const closeTaxPlanning = () => {
    setTaxPlanningOpen(false);
    setTaxPlanningTab('pension');
    setPensionMonthly(200);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const saveProfile = () => {
    setProfileModalOpen(false);
  };

  const clearProfileData = () => {
    if (window.confirm('Clear all profile data? This cannot be undone.')) {
      setProfileName('');
      setBusinessName('');
      setTradeType('Freelancer');
      setTaxYear('2025-2026');
      setVatRegistered(true);
      setUtrNumber('');
      setMtdReminders(true);
      setWeeklySummary(true);
      setExpenseAlerts(true);
    }
  };

  const closeExpenseLibrary = () => {
    setExpenseLibraryOpen(false);
    setExpenseLibrarySearch('');
    setExpenseLibraryFilter('All');
    setExpenseLibraryExpanded(new Set());
    setExpenseLibraryToast(false);
    if (expenseLibraryToastTimeout.current) {
      clearTimeout(expenseLibraryToastTimeout.current);
      expenseLibraryToastTimeout.current = null;
    }
  };

  const showExpenseLibraryToast = () => {
    setExpenseLibraryToast(true);
    if (expenseLibraryToastTimeout.current) {
      clearTimeout(expenseLibraryToastTimeout.current);
    }
    expenseLibraryToastTimeout.current = setTimeout(() => {
      setExpenseLibraryToast(false);
      expenseLibraryToastTimeout.current = null;
    }, 1800);
  };

  const addExpenseFromLibrary = (item, groupTitle) => {
    const nextIndex = transactions.length;
    const newTransaction = {
      description: item.name,
      date: new Date().toISOString().slice(0, 10),
      amount: '0.00',
      type: 'debit',
      category: expenseLibraryCategoryMap[groupTitle] || 'Unknown',
      confidence: 90,
      reasoning: item.description,
      status: 'claimed',
    };
    setTransactions([...transactions, newTransaction]);
    const newSelected = new Set(selectedTransactions);
    newSelected.add(nextIndex);
    setSelectedTransactions(newSelected);
    showExpenseLibraryToast();
  };

  const toggleExpenseLibraryCategory = (category) => {
    const nextExpanded = new Set(expenseLibraryExpanded);
    if (nextExpanded.has(category)) {
      nextExpanded.delete(category);
    } else {
      nextExpanded.add(category);
    }
    setExpenseLibraryExpanded(nextExpanded);
  };

  const addJourneyTransaction = () => {
    const miles = parseFloat(journeyMiles) || 0;
    const amount = (miles * 0.45).toFixed(2);
    const nextIndex = transactions.length;
    const newTransaction = {
      description: `${journeyFrom || 'From'} → ${journeyTo || 'To'}`,
      date: journeyDate,
      amount,
      type: 'debit',
      category: 'Travel',
      confidence: 95,
      reasoning: `Journey purpose: ${journeyPurpose}`,
      status: 'claimed',
    };
    setTransactions([...transactions, newTransaction]);
    setJourneys([...journeys, {
      date: journeyDate,
      from: journeyFrom,
      to: journeyTo,
      purpose: journeyPurpose,
      miles,
      amount,
    }] );
    const newSelected = new Set(selectedTransactions);
    newSelected.add(nextIndex);
    setSelectedTransactions(newSelected);
    closeJourneyModal();
  };

  const handleAskTaxAISend = () => {
    const userText = taxAIInput.trim();
    if (!userText) return;
    const nextMessages = [...taxAIMessages, { sender: 'user', text: userText }];
    setTaxAIMessages([...nextMessages, {
      sender: 'ai',
      text: 'TaxAI is coming soon — this feature will be powered by Claude AI and will answer any UK tax question specific to your situation. In the meantime visit gov.uk/self-employed-expenses for guidance.',
    }]);
    setTaxAIInput('');
  };

  const handleReceiptDragOver = (e) => {
    e.preventDefault();
    receiptDropZoneRef.current.style.borderColor = '#00D897';
    receiptDropZoneRef.current.style.backgroundColor = 'rgba(0, 216, 151, 0.05)';
  };

  const handleReceiptDragLeave = (e) => {
    e.preventDefault();
    receiptDropZoneRef.current.style.borderColor = '#444';
    receiptDropZoneRef.current.style.backgroundColor = 'transparent';
  };

  const handleReceiptDrop = (e) => {
    e.preventDefault();
    receiptDropZoneRef.current.style.borderColor = '#444';
    receiptDropZoneRef.current.style.backgroundColor = 'transparent';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleReceiptFile(files[0]);
    }
  };

  const handleReceiptFile = async (file) => {
    setReceiptOcrError(null);
    setReceiptOcrProcessing(true);
    setReceiptOcrProgress(0);

    const doParse = async (imageData) => {
      try {
        const result = await recognizeImage(imageData, (percent) => setReceiptOcrProgress(percent));
        const text = result.data.text.trim();

        const { merchant, date, total } = parseReceiptDetails(text);
        setReceiptMerchant(merchant);
        setReceiptDate(date);
        setReceiptTotal(total);
      } catch (error) {
        console.error('Receipt OCR Error:', error);
        setReceiptOcrError('Unable to read this receipt clearly. Try another image.');
      } finally {
        setReceiptOcrProcessing(false);
        setReceiptOcrProgress(0);
      }
    };

    const reader = new FileReader();
    reader.onload = async (e) => {
      await doParse(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const recognizeImage = async (imageData, progressCallback) => {
    let Tesseract = window.Tesseract;
    if (!Tesseract) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js';
      script.id = 'tesseract-script';
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
      Tesseract = window.Tesseract;
    }

    return Tesseract.recognize(imageData, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing' || m.status === 'initialized' || m.status === 'recognizing text') {
          const percent = Math.round((m.progress || 0) * 100);
          progressCallback(percent);
        }
      },
    });
  };

  const addReceiptTransaction = () => {
    const normalizedAmount = parseFloat((receiptTotal || '').replace(/[^0-9.]/g, '')) || 0;
    const nextIndex = transactions.length;
    const newTransaction = {
      description: receiptMerchant || 'Scanned Receipt',
      date: receiptDate || '',
      amount: normalizedAmount.toFixed(2),
      type: 'debit',
      category: receiptCategory || 'Unknown',
      confidence: 90,
      reasoning: 'Manually added scanned receipt.',
      status: 'claimed',
    };
    setTransactions([...transactions, newTransaction]);
    const newSelected = new Set(selectedTransactions);
    if (receiptCategory !== 'Personal') {
      newSelected.add(nextIndex);
      setSelectedTransactions(newSelected);
    }
    closeScanModal();
  };

  // OCR image using Tesseract.js
  const ocrImage = async (file) => {
    try {
      setIsProcessing(true);
      setOcrProgress(0);
      setOcrError(null);
      
      // Check if Tesseract is already loaded
      let Tesseract = window.Tesseract;
      if (!Tesseract) {
        // Load Tesseract.js from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js';
        script.id = 'tesseract-script';
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
        Tesseract = window.Tesseract;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const imageData = e.target.result;
          const result = await Tesseract.recognize(imageData, 'eng', {
            logger: (m) => {
              // Update progress bar
              if (m.status === 'recognizing') {
                const percent = Math.round(m.progress * 100);
                setOcrProgress(percent);
              }
            },
          });
          
          const extractedText = result.data.text.trim();
          
          // Check if meaningful text was extracted
          if (!extractedText || extractedText.length < 10) {
            setOcrError(true);
            setOcrProgress(0);
            setIsProcessing(false);
            return;
          }
          
          // Check for extraction warning (less than 50 characters)
          if (extractedText.length < 50) {
            setExtractionWarning(true);
          } else {
            setExtractionWarning(false);
          }
          
          setExtractedText(extractedText);
          setShowPreview(true);
          setOcrProgress(0);
          setOcrError(null);
        } catch (error) {
          console.error('OCR Error:', error);
          setOcrError(true);
          setOcrProgress(0);
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Tesseract load error:', error);
      setOcrError(true);
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  // Handle file selection
  const handleFile = async (file) => {
    setUploadedFile(file);
    setIsProcessing(true);

    const extension = file.name.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png'].includes(extension)) {
      // Process as image (OCR)
      await ocrImage(file);
    } else if (extension === 'csv') {
      // Process as CSV
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = parseCSV(e.target.result);
        setExtractedText(text);
        setShowPreview(true);
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else if (extension === 'ofx') {
      // Process as OFX
      const reader = new FileReader();
      reader.onload = (e) => {
        setExtractedText(e.target.result);
        setShowPreview(true);
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else {
      alert('Unsupported file format. Please upload JPG, PNG, CSV, or OFX.');
      setIsProcessing(false);
    }
  };

  // Analyze transactions
  const analyzeTransactions = async () => {
    if (!extractedText.trim()) {
      setApiError('Please upload and extract text from a file first.');
      return;
    }

    try {
      setIsProcessing(true);
      setApiError(null);
      setNoResultsFound(false);
      
      const response = await fetch('/api/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: extractedText }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.transactions || data.transactions.length === 0) {
        setNoResultsFound(true);
        setTransactions([]);
      } else {
        setTransactions(data.transactions || []);
        setSelectedTransactions(new Set());
        setExpandedTransactions(new Set());
        setNoResultsFound(false);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setApiError('Something went wrong analysing your statement — please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle transaction selection
  const toggleTransactionSelection = (id) => {
    const newSelected = new Set(selectedTransactions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTransactions(newSelected);
  };

  // Toggle transaction expansion
  const toggleTransactionExpansion = (id) => {
    const newExpanded = new Set(expandedTransactions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTransactions(newExpanded);
  };



  // Load test data for development
  const loadTestData = () => {
    const testTransactions = [
      {
        description: "Microsoft 365",
        date: "24 Apr 2026",
        amount: "8.49",
        type: "debit",
        category: "Software",
        confidence: 95,
        reasoning: "Microsoft 365 subscription is fully claimable as a business software expense under HMRC rules"
      },
      {
        description: "Nuffield Health",
        date: "23 Apr 2026", 
        amount: "99.00",
        type: "debit",
        category: "Personal",
        confidence: 85,
        reasoning: "Gym membership is generally not claimable as a business expense unless you are a fitness professional"
      },
      {
        description: "COX AD",
        date: "23 Apr 2026",
        amount: "62.00", 
        type: "credit",
        category: "Professional",
        confidence: 90,
        reasoning: "Appears to be income received for professional services"
      }
    ];
    
    setTransactions(testTransactions);
    setSelectedTransactions(new Set([0])); // Select first transaction
    setExpandedTransactions(new Set());
  };

  // Get category color
  const getCategoryColor = (category) => {
    const categories = {
      'Travel': '#3B82F6',
      'Equipment': '#8B5CF6',
      'Software': '#06B6D4',
      'Marketing': '#F59E0B',
      'Meals': '#EF4444',
      'Office': '#10B981',
      'Professional': '#EC4899',
      'Training': '#F97316',
      'Personal': '#6B7280',
      'Unknown': '#FBBF24',
    };
    return categories[category] || '#FBBF24';
  };

  // Get category emoji
  const getCategoryEmoji = (category) => {
    const emojis = {
      'Travel': '🚗',
      'Equipment': '🔧',
      'Software': '💻',
      'Marketing': '📣',
      'Meals': '🍽️',
      'Office': '📎',
      'Professional': '👔',
      'Training': '📚',
      'Personal': '🏠',
      'Unknown': '❓',
    };
    return emojis[category] || '❓';
  };

  // Reclassify transaction
  const reclassifyTransaction = (transactionIndex, newCategory) => {
    const newTrans = [...transactions];
    newTrans[transactionIndex].category = newCategory;
    setTransactions(newTrans);

    // Auto-select/deselect checkbox based on category
    const newSelected = new Set(selectedTransactions);
    if (newCategory === 'Personal') {
      newSelected.delete(transactionIndex);
    } else {
      newSelected.add(transactionIndex);
    }
    setSelectedTransactions(newSelected);
  };

  // Check if transaction is income
  const isIncomeTransaction = (transaction) => {
    return transaction.type === 'credit';
  };

  // Check if transaction is personal or uncertain
  const isPersonalOrUncertain = (transaction) => {
    return transaction.category === 'Personal' || transaction.category === 'Unknown';
  };

  // Check if transaction is claimable expense
  const isClaimableExpense = (transaction) => {
    return !isIncomeTransaction(transaction) && !isPersonalOrUncertain(transaction);
  };

  // Get transaction state for styling
  const getTransactionState = (transaction) => {
    if (isIncomeTransaction(transaction)) {
      return 'income';
    } else if (isPersonalOrUncertain(transaction)) {
      return 'uncertain';
    } else {
      return 'claimable';
    }
  };

  // Calculate total claimable expenses
  const calculateClaimableTotal = () => {
    return transactions
      .filter((t, idx) => selectedTransactions.has(idx) && isClaimableExpense(t))
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  };

  // Calculate total business income
  const calculateBusinessIncome = () => {
    return transactions
      .filter((t, idx) => {
        const isSelected = selectedTransactions.has(idx);
        const isIncome = isIncomeTransaction(t);
        const isNotBusinessMarked = notBusinessIncomeReasons.has(idx);
        return isSelected && isIncome && !isNotBusinessMarked;
      })
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  };

  // Count transactions to review (Personal/Unknown)
  const countToReview = () => {
    return transactions.filter((t) => {
      return (t.category === 'Personal' || t.category === 'Unknown') && !isIncomeTransaction(t);
    }).length;
  };

  // Calculate estimated tax saved (20% of claimable)
  const calculateTaxSaved = () => {
    return calculateClaimableTotal() * 0.20;
  };

  // Mark income as not business income with reason
  const markAsNotBusinessIncome = (idx, reason) => {
    const newReasons = new Map(notBusinessIncomeReasons);
    newReasons.set(idx, reason);
    setNotBusinessIncomeReasons(newReasons);
    
    // Remove from business income and deselect
    const newBusinessIncome = new Set(businessIncomeTransactions);
    newBusinessIncome.delete(idx);
    setBusinessIncomeTransactions(newBusinessIncome);
  };

  // Mark income as business income (undo not business)
  const markAsBusinessIncome = (idx) => {
    const newReasons = new Map(notBusinessIncomeReasons);
    newReasons.delete(idx);
    setNotBusinessIncomeReasons(newReasons);
    
    // Add to business income and select
    const newBusinessIncome = new Set(businessIncomeTransactions);
    newBusinessIncome.add(idx);
    setBusinessIncomeTransactions(newBusinessIncome);
    
    const newSelected = new Set(selectedTransactions);
    newSelected.add(idx);
    setSelectedTransactions(newSelected);
  };

  // Check if income is marked as not business
  const isMarkedAsNotBusiness = (idx) => {
    return notBusinessIncomeReasons.has(idx);
  };

  // Get not business reason
  const getNotBusinessReason = (idx) => {
    return notBusinessIncomeReasons.get(idx);
  };



  // Helper to escape CSV values
  const escapeCSV = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Export claimable transactions as CSV
  const exportClaimableCSV = () => {
    const headers = ['Date', 'Merchant', 'Amount', 'Category', 'Tax Estimated Saving', 'Notes'];
    const rows = [];
    
    transactions.forEach((t, idx) => {
      if (selectedTransactions.has(idx) && isClaimableExpense(t)) {
        const amount = parseFloat(t.amount) || 0;
        const taxSaving = (amount * 0.2).toFixed(2);
        rows.push([
          escapeCSV(t.date),
          escapeCSV(t.description),
          escapeCSV(amount.toFixed(2)),
          escapeCSV(t.category),
          escapeCSV(taxSaving),
          escapeCSV(t.reasoning || '')
        ]);
      }
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'taxside-expenses.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export all transactions as CSV with status
  const exportAllCSV = () => {
    const headers = ['Date', 'Merchant', 'Amount', 'Category', 'Status', 'Tax Estimated Saving', 'Notes'];
    const rows = [];
    
    transactions.forEach((t, idx) => {
      let status = 'Unknown';
      
      if (isIncomeTransaction(t)) {
        if (isMarkedAsNotBusiness(idx)) {
          status = 'Not Business Income';
        } else {
          status = 'Business Income';
        }
      } else if (isPersonalOrUncertain(t)) {
        status = 'Personal';
      } else {
        status = 'Claimable';
      }
      
      const amount = parseFloat(t.amount) || 0;
      const taxSaving = isClaimableExpense(t) ? (amount * 0.2).toFixed(2) : '0.00';
      
      rows.push([
        escapeCSV(t.date),
        escapeCSV(t.description),
        escapeCSV(amount.toFixed(2)),
        escapeCSV(t.category),
        escapeCSV(status),
        escapeCSV(taxSaving),
        escapeCSV(t.reasoning || '')
      ]);
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'taxside-expenses.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const expenseLibraryFlatItems = expenseLibraryGroups.flatMap((group) =>
    group.items.map((item) => ({ ...item, category: group.title }))
  );

  const expenseLibraryFilterMatches = (item) => {
    const lowerSearch = expenseLibrarySearch.toLowerCase();
    return (
      (`${item.name} ${item.description} ${item.category}`.toLowerCase().includes(lowerSearch)) &&
      (expenseLibraryFilter === 'All' || item.tags.includes(expenseLibraryFilter))
    );
  };

  const expenseLibrarySearchResults = expenseLibraryFlatItems.filter(expenseLibraryFilterMatches);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-copy">
          <h1>🏦 TaxSide</h1>
          <p>UK Tax Expense Analyser for Self-Employed</p>
        </div>
        <div className="app-header-actions">
          {profileName && <span className="app-header-user">Welcome, {profileName}</span>}
          <button
            className="settings-btn"
            type="button"
            onClick={() => setProfileModalOpen(true)}
          >
            ⚙️ Settings
          </button>
        </div>
      </header>

      {showMtdAlert && (
        <div className="mtd-alert-banner">
          <div className="mtd-alert-content">
            <p className="mtd-alert-label">⚠️ MTD Deadline</p>
            <p className="mtd-alert-title">Q2 submission due 7 Nov 2026</p>
            <p className="mtd-alert-description">Submit your income and expenses to HMRC by this date</p>
          </div>
          <div className="mtd-alert-actions">
            <a
              className="mtd-alert-link"
              href="https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
            <button
              className="mtd-alert-close"
              onClick={() => setShowMtdAlert(false)}
              aria-label="Dismiss MTD alert"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <main className="app-main">
        {/* Upload Section */}
        <section className="upload-section">
          <h2>Upload Your Bank Statement</h2>
          <div className="upload-action-row">
            <button
              className="scan-receipt-btn"
              onClick={() => setScanModalOpen(true)}
              type="button"
            >
              📸 Scan Receipt
            </button>
            <button
              className="log-journey-btn"
              onClick={() => setJourneyModalOpen(true)}
              type="button"
            >
              🚗 Log Journey
            </button>
            <button
              className="mileage-tracker-btn"
              onClick={() => setMileageModalOpen(true)}
              type="button"
            >
              🚗 Mileage Tracker
            </button>
            <button
              className="ask-taxai-btn"
              onClick={() => setAskTaxAIModalOpen(true)}
              type="button"
            >
              🤖 Ask TaxAI
            </button>
            <button
              className="tax-planning-btn"
              onClick={() => setTaxPlanningOpen(true)}
              type="button"
            >
              📈 Tax Planning
            </button>
            <button
              className="expense-library-btn"
              onClick={() => setExpenseLibraryOpen(true)}
              type="button"
            >
              📚 Expense Library
            </button>
          </div>

          {/* MTD Quarterly Timeline */}
          <div className="mtd-timeline-section">
            <h3>MTD Quarterly Submissions</h3>
            <p className="mtd-timeline-subtitle">Tax Year 2025 – 2026</p>
            <div className="mtd-quarter-cards">
              {mtdQuarters.map((quarter) => (
                <div key={quarter.label} className={`mtd-quarter-card ${quarter.status}`}>
                  <div className="mtd-quarter-label">{quarter.label}</div>
                  <div className="mtd-quarter-dates">{quarter.dateRange}</div>
                  <div className="mtd-quarter-deadline">Deadline: {quarter.deadline}</div>
                  <div className="mtd-quarter-status">{quarter.badge}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={dropZoneRef}
            className="drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="drop-zone-content">
              <div className="drop-icon">📄</div>
              <p>Drag and drop your file here</p>
              <p className="drop-hint">or click to select</p>
              <input
                type="file"
                onChange={(e) => handleFile(e.target.files[0])}
                accept=".jpg,.jpeg,.png,.csv,.ofx"
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input" className="file-input-label">
                Choose File
              </label>
              <p className="supported-formats">
                Supported: JPG, PNG, CSV, OFX
              </p>
            </div>
          </div>

          {/* OCR Progress Bar */}
          {isProcessing && ocrProgress > 0 && (
            <div className="ocr-progress-container">
              <div className="ocr-progress-label">
                Reading your statement… {ocrProgress}%
              </div>
              <div className="ocr-progress-bar">
                <div className="ocr-progress-fill" style={{ width: `${ocrProgress}%` }}></div>
              </div>
            </div>
          )}

          {/* OCR Error State */}
          {ocrError && (
            <div className="ocr-error-container">
              <p className="ocr-error-message">😕 We couldn't read this image clearly — try a clearer screenshot or use a CSV export from your bank instead</p>
              <button
                className="retry-btn"
                onClick={() => {
                  setOcrError(null);
                  setUploadedFile(null);
                  setExtractedText('');
                }}
              >
                Try Another File
              </button>
            </div>
          )}

          {uploadedFile && (
            <div className="file-info">
              ✓ File: <strong>{uploadedFile.name}</strong>
            </div>
          )}

          {/* Preview Box */}
          {showPreview && extractedText && (
            <div>
              {extractionWarning && (
                <div className="extraction-warning-banner">
                  <span>⚠️ Not much text was extracted — results may be incomplete. For best results use a CSV export from your bank.</span>
                </div>
              )}
              <div className="preview-box">
                <div className="preview-header">
                  <h3>Extracted Text Preview</h3>
                  <button
                    className="close-preview"
                    onClick={() => setShowPreview(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="preview-content">
                  {extractedText.substring(0, 500)}
                  {extractedText.length > 500 ? '...' : ''}
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            className="analyze-btn"
            onClick={analyzeTransactions}
            disabled={!extractedText || isProcessing}
          >
            {isProcessing ? 'Analysing with TaxSide AI…' : 'Find My Claimable Expenses'}
          </button>

          {/* Test Data Button */}
          <button
            className="test-data-btn"
            onClick={loadTestData}
          >
            Load Test Data
          </button>
        </section>

        {/* Transactions Section */}
        {(transactions.length > 0 || apiError || noResultsFound) && (
          <section className="transactions-section">
            {/* API Error Card */}
            {apiError && (
              <div className="api-error-card">
                <p className="api-error-message">{apiError}</p>
                <button
                  className="retry-btn api-retry"
                  onClick={analyzeTransactions}
                >
                  Retry
                </button>
                <button
                  className="close-error-btn"
                  onClick={() => setApiError(null)}
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            )}

            {/* No Results Empty State */}
            {noResultsFound && (
              <div className="empty-state">
                <p className="empty-state-message">🤔 No transactions found — your statement may not have been read clearly, try uploading a CSV instead</p>
              </div>
            )}

            {transactions.length > 0 && (
              <>
            {/* Sticky Summary Bar */}
            <div className="sticky-summary-bar">
              <div className="summary-figure">
                <span className="summary-number" style={{ color: 'var(--accent)' }}>
                  £{calculateClaimableTotal().toFixed(2)}
                </span>
                <span className="summary-label">💰 To Claim</span>
              </div>
              <div className="summary-figure">
                <span className="summary-number" style={{ color: '#3B82F6' }}>
                  £{calculateBusinessIncome().toFixed(2)}
                </span>
                <span className="summary-label">📥 Business Income</span>
              </div>
              <div className="summary-figure">
                <span className="summary-number" style={{ color: '#FBBF24' }}>
                  {countToReview()}
                </span>
                <span className="summary-label">⚠️ To Review</span>
              </div>
              <div className="summary-figure">
                <span className="summary-number" style={{ color: 'var(--accent)' }}>
                  £{calculateTaxSaved().toFixed(2)}
                </span>
                <span className="summary-label">🧾 Tax Saved</span>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="export-buttons">
              <button
                className="export-btn export-claimable"
                onClick={exportClaimableCSV}
                disabled={selectedTransactions.size === 0}
                title={selectedTransactions.size === 0 ? 'Select transactions to export' : 'Export claimable transactions'}
              >
                📥 Export CSV
              </button>
              <button
                className="export-btn export-all"
                onClick={exportAllCSV}
                disabled={transactions.length === 0}
                title={transactions.length === 0 ? 'No transactions to export' : 'Export all transactions with status'}
              >
                📄 Export All
              </button>
            </div>

            <div className="transactions-header">
              <h2>Claimable Expenses</h2>
              <div className="totals-row">
                <div className="total-box">
                  <span className="total-label">Expenses:</span>
                  <span className="total-amount">
                    £{calculateClaimableTotal().toFixed(2)}
                  </span>
                </div>
                <div className="total-box">
                  <span className="total-label">Business Income:</span>
                  <span className="total-amount income">
                    £{calculateBusinessIncome().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="transactions-list">
              {transactions.map((transaction, idx) => {
                const state = getTransactionState(transaction);
                const isIncome = isIncomeTransaction(transaction);
                const isUncertain = isPersonalOrUncertain(transaction);
                
                return (
                <div
                  key={idx}
                  className={`transaction-card state-${state} ${selectedTransactions.has(idx) ? 'selected' : ''} ${isIncome && isMarkedAsNotBusiness(idx) ? 'not-business' : ''}`}
                  style={{ opacity: isUncertain ? 0.85 : 1 }}
                  onClick={() => toggleTransactionExpansion(idx)}
                >
                  <div className="transaction-card-main">
                    {isIncome ? (
                      <div className="income-controls">
                        {isMarkedAsNotBusiness(idx) ? (
                          <div className="not-business-container">
                            <button
                              className="undo-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsBusinessIncome(idx);
                              }}
                              title="Mark as Business Income"
                            >
                              ↺ Business Income
                            </button>
                            <span className="reason-badge">{getNotBusinessReason(idx)}</span>
                          </div>
                        ) : (
                          <div className="business-income-container">
                            <button
                              className="toggle-btn active"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTransactions(new Set(expandedTransactions).add(idx));
                              }}
                              title="Business Income"
                            >
                              💼
                            </button>
                            <span className="toggle-label">Business Income</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        className="transaction-checkbox"
                        checked={selectedTransactions.has(idx)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleTransactionSelection(idx);
                        }}
                      />
                    )}
                    <div className="transaction-info">
                      <p className="transaction-description">
                        {transaction.description || 'Transaction'}
                      </p>
                      <p className="transaction-date">
                        {transaction.date || 'No date'}
                      </p>
                      {transaction.status === 'claimed' && (
                        <span className="status-pill">claimed</span>
                      )}
                    </div>
                    <div className="transaction-category">
                      <div className="category-info">
                        <span
                          className="category-badge"
                          style={{ backgroundColor: getCategoryColor(transaction.category) }}
                        >
                          {getCategoryEmoji(transaction.category)} {transaction.category || 'Unknown'}
                        </span>
                        {isUncertain && (
                          <p className="uncertain-prompt">👀 Double check — you may still be able to claim this</p>
                        )}
                      </div>
                    </div>
                    <div className="transaction-amount">
                      <p className={`amount ${selectedTransactions.has(idx) ? 'selected' : ''}`}>
                        £{parseFloat(transaction.amount || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedTransactions.has(idx) && (
                    <div className="transaction-expanded">
                      <div className="reasoning-section">
                        <h4>AI Reasoning</h4>
                        <p>{transaction.reasoning || 'No reasoning provided.'}</p>
                      </div>

                      {isIncome && !isMarkedAsNotBusiness(idx) && (
                        <div className="not-business-section">
                          <label>This is not business income:</label>
                          <div className="reason-buttons">
                            {['Refund', 'Loan / money owed', 'Personal transfer', 'Sale of personal item', 'Other'].map((reason) => (
                              <button
                                key={reason}
                                className="reason-btn"
                                onClick={() => markAsNotBusinessIncome(idx, reason)}
                              >
                                ✕ {reason}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {!isIncome && (
                        <div className="reclassify-section">
                          <label>Reclassify Category:</label>
                          <div className="reclassify-buttons">
                            {['Travel', 'Equipment', 'Software', 'Marketing', 'Meals', 'Office', 'Professional', 'Training', 'Personal', 'Unknown'].map((category) => (
                              <button
                                key={category}
                                className={`reclassify-btn ${transaction.category === category ? 'active' : ''}`}
                                style={{
                                borderColor: getCategoryColor(category),
                                backgroundColor: transaction.category === category ? getCategoryColor(category) : 'rgba(255, 255, 255, 0.05)'
                              }}
                              onClick={() => reclassifyTransaction(idx, category)}
                            >
                              {getCategoryEmoji(category)} {category}
                            </button>
                          ))}
                        </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
              </>
            )}
          </section>
        )}

        {isProcessing && !ocrProgress && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Analysing with TaxSide AI…</p>
          </div>
        )}
      </main>

      {scanModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Scan a Receipt</h2>
              <button className="modal-close" onClick={closeScanModal} aria-label="Close receipt scanner">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div
                ref={receiptDropZoneRef}
                className="modal-drop-zone"
                onClick={() => document.getElementById('receipt-file-input')?.click()}
                onDragOver={handleReceiptDragOver}
                onDragLeave={handleReceiptDragLeave}
                onDrop={handleReceiptDrop}
              >
                <div className="drop-zone-content">
                  <div className="drop-icon">📸</div>
                  <p>Drag and drop your receipt image here</p>
                  <p className="drop-hint">or click to select an image</p>
                  <input
                    type="file"
                    onChange={(e) => e.target.files && handleReceiptFile(e.target.files[0])}
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    id="receipt-file-input"
                  />
                  <label htmlFor="receipt-file-input" className="file-input-label">
                    Choose Receipt Image
                  </label>
                  <p className="supported-formats">Supported: JPG, PNG</p>
                </div>
              </div>

              {receiptOcrProcessing && (
                <div className="ocr-progress-container modal-progress">
                  <div className="ocr-progress-label">
                    Reading your receipt… {receiptOcrProgress}%
                  </div>
                  <div className="ocr-progress-bar">
                    <div className="ocr-progress-fill" style={{ width: `${receiptOcrProgress}%` }}></div>
                  </div>
                </div>
              )}

              {receiptOcrError && (
                <div className="ocr-error-container modal-error">
                  <p className="ocr-error-message">{receiptOcrError}</p>
                </div>
              )}

              <div className="receipt-fields">
                <label>
                  Merchant Name
                  <input
                    type="text"
                    value={receiptMerchant}
                    onChange={(e) => setReceiptMerchant(e.target.value)}
                    placeholder="Merchant name"
                  />
                </label>
                <label>
                  Date
                  <input
                    type="text"
                    value={receiptDate}
                    onChange={(e) => setReceiptDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                  />
                </label>
                <label>
                  Total Amount
                  <input
                    type="text"
                    value={receiptTotal}
                    onChange={(e) => setReceiptTotal(e.target.value)}
                    placeholder="0.00"
                  />
                </label>
              </div>

              <div className="category-selector">
                <p className="category-selector-label">Category</p>
                <div className="category-pill-list">
                  {receiptCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`category-pill ${receiptCategory === category ? 'active' : ''}`}
                      style={{ borderColor: getCategoryColor(category), backgroundColor: receiptCategory === category ? getCategoryColor(category) : 'transparent' }}
                      onClick={() => setReceiptCategory(category)}
                    >
                      {getCategoryEmoji(category)} {category}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="add-expense-btn"
                onClick={addReceiptTransaction}
                disabled={receiptOcrProcessing || !receiptMerchant || !receiptDate || !receiptTotal}
              >
                Add to Expenses
              </button>
            </div>
          </div>
        </div>
      )}

      {journeyModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Log a Journey</h2>
              <button className="modal-close" onClick={closeJourneyModal} aria-label="Close journey logger">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-input-grid">
                <label>
                  From
                  <input
                    type="text"
                    value={journeyFrom}
                    onChange={(e) => setJourneyFrom(e.target.value)}
                    placeholder="Starting location"
                  />
                </label>
                <label>
                  To
                  <input
                    type="text"
                    value={journeyTo}
                    onChange={(e) => setJourneyTo(e.target.value)}
                    placeholder="Destination"
                  />
                </label>
                <label>
                  Date
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                  />
                </label>
                <label>
                  Miles
                  <input
                    type="number"
                    value={journeyMiles}
                    onChange={(e) => setJourneyMiles(e.target.value)}
                    placeholder="0.0"
                    min="0"
                    step="0.1"
                  />
                </label>
                <label>
                  Purpose
                  <select
                    value={journeyPurpose}
                    onChange={(e) => setJourneyPurpose(e.target.value)}
                  >
                    {journeyPurposeOptions.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="journey-rate-text">
                HMRC rate: {journeyMiles || 0} miles × 45p = £{((parseFloat(journeyMiles) || 0) * 0.45).toFixed(2)}
              </div>
              <button
                className="add-expense-btn"
                onClick={addJourneyTransaction}
                disabled={!journeyFrom || !journeyTo || !journeyDate || !(parseFloat(journeyMiles) > 0)}
              >
                Add Journey
              </button>
            </div>
          </div>
        </div>
      )}

      {mileageModalOpen && (
        <div className="modal-overlay full-screen" role="dialog" aria-modal="true">
          <div className="modal-card mileage-modal-card">
            <div className="modal-header">
              <div>
                <h2>Mileage Tracker</h2>
                <p className="modal-subtitle">HMRC approved log at 45p per mile</p>
              </div>
              <button className="modal-close" onClick={closeMileageModal} aria-label="Close mileage tracker">
                ✕
              </button>
            </div>
            <div className="modal-body mileage-modal-body">
              <div className="mileage-summary-bar">
                <div className="mileage-summary-card">
                  <p>Total miles this year</p>
                  <strong>{journeys.reduce((sum, item) => sum + item.miles, 0).toFixed(1)}</strong>
                </div>
                <div className="mileage-summary-card">
                  <p>Total value</p>
                  <strong>£{journeys.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)}</strong>
                </div>
                <div className="mileage-summary-card">
                  <p>Estimated tax saving</p>
                  <strong>£{(journeys.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0) * 0.2).toFixed(2)}</strong>
                </div>
              </div>

              {journeys.length === 0 ? (
                <div className="mileage-empty-state">
                  🚗 No journeys logged yet — use the Log Journey button to add your first trip
                </div>
              ) : (
                <div className="mileage-journey-list">
                  {journeys.map((journey, idx) => (
                    <div key={`${journey.date}-${idx}`} className="mileage-journey-card">
                      <div className="journey-row">
                        <div>
                          <span className="journey-label">Date</span>
                          <div>{journey.date}</div>
                        </div>
                        <div>
                          <span className="journey-label">Miles</span>
                          <div>{journey.miles.toFixed(1)}</div>
                        </div>
                        <div>
                          <span className="journey-label">Value</span>
                          <div>£{parseFloat(journey.amount || 0).toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="journey-row journey-details-row">
                        <div>
                          <span className="journey-label">From → To</span>
                          <div>{journey.from || 'From'} → {journey.to || 'To'}</div>
                        </div>
                        <div>
                          <span className="journey-label">Purpose</span>
                          <div>{journey.purpose}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer mileage-footer">
              <button className="save-profile-btn" type="button" onClick={openJourneyFromMileage}>
                Log New Journey
              </button>
              <button className="export-mileage-btn" type="button" onClick={exportMileageCSV}>
                Export Mileage Log
              </button>
            </div>
          </div>
        </div>
      )}

      {askTaxAIModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>Ask TaxAI</h2>
                <p className="modal-subtitle">Your personal UK tax expert — ask anything</p>
              </div>
              <button className="modal-close" onClick={closeAskTaxAIModal} aria-label="Close TaxAI chat">
                ✕
              </button>
            </div>
            <div className="modal-body taxai-body">
              <div className="taxai-suggestions">
                {['Can I claim my home office?', 'Is my car claimable?', 'What expenses am I missing?'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="taxai-pill"
                    onClick={() => setTaxAIInput(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <div className="taxai-chat-window">
                <div className="taxai-message-list">
                  {taxAIMessages.length === 0 && (
                    <div className="taxai-empty-state">Ask a question to start the chat.</div>
                  )}
                  {taxAIMessages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`taxai-message ${message.sender}`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
                <div className="taxai-input-row">
                  <input
                    className="taxai-input"
                    type="text"
                    value={taxAIInput}
                    onChange={(e) => setTaxAIInput(e.target.value)}
                    placeholder="Ask TaxAI a question..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAskTaxAISend()}
                  />
                  <button
                    className="taxai-send-btn"
                    type="button"
                    onClick={handleAskTaxAISend}
                    disabled={!taxAIInput.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {taxPlanningOpen && (
        <div className="modal-overlay full-screen" role="dialog" aria-modal="true">
          <div className="modal-card taxplanning-card">
            <div className="modal-header">
              <div>
                <h2>Tax Planning</h2>
                <p className="modal-subtitle">Keep more of what you earn</p>
              </div>
              <button className="modal-close" onClick={closeTaxPlanning} aria-label="Close tax planning">
                ✕
              </button>
            </div>
            <div className="modal-body taxplanning-body">
              <div className="taxplanning-tabs">
                {taxPlanningTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`taxplanning-tab ${taxPlanningTab === tab.id ? 'active' : ''}`}
                    onClick={() => setTaxPlanningTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {taxPlanningTab === 'pension' && (
                <div className="taxplanning-panel">
                  <h3>Pension Tax Relief Calculator</h3>
                  <div className="pension-slider-card">
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="10"
                      value={pensionMonthly}
                      onChange={(e) => setPensionMonthly(Number(e.target.value))}
                    />
                    <div className="slider-value">£{pensionMonthly} / month</div>
                  </div>
                  <div className="taxplanning-result-grid">
                    <div className="taxplanning-result-card">
                      <p className="result-label">Tax saved per year at 20%</p>
                      <p className="result-value">£{(pensionMonthly * 12 * 0.2).toFixed(2)}</p>
                    </div>
                    <div className="taxplanning-result-card">
                      <p className="result-label">Tax saved per year at 40%</p>
                      <p className="result-value">£{(pensionMonthly * 12 * 0.4).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="taxplanning-info-grid">
                    <div className="taxplanning-info-card">
                      <strong>Basic rate relief</strong>
                      <p>Added automatically at source for most contributions.</p>
                    </div>
                    <div className="taxplanning-info-card">
                      <strong>Higher rate relief</strong>
                      <p>Claim through self assessment if you pay 40% or 45% tax.</p>
                    </div>
                    <div className="taxplanning-info-card">
                      <strong>Carry forward allowance</strong>
                      <p>Use unused allowance from the past 3 years.</p>
                    </div>
                    <div className="taxplanning-info-card">
                      <strong>Annual allowance</strong>
                      <p>Currently £60,000 for most taxpayers.</p>
                    </div>
                  </div>
                </div>
              )}

              {taxPlanningTab === 'shares' && (
                <div className="taxplanning-panel taxplanning-grid">
                  {[
                    { label: 'CGT allowance', value: '£3,000' },
                    { label: 'Basic rate', value: '18%' },
                    { label: 'Higher rate', value: '24%' },
                    { label: 'ISA allowance', value: '£20,000' },
                    { label: 'Dividend allowance', value: '£500' },
                  ].map((item) => (
                    <div key={item.label} className="taxplanning-stat-card">
                      <p className="stat-label">{item.label}</p>
                      <p className="stat-value">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {taxPlanningTab === 'eis' && (
                <div className="taxplanning-panel taxplanning-grid">
                  {[
                    { title: 'SEIS 50% relief', description: 'Income tax relief on qualifying SEIS investments.' },
                    { title: 'EIS 30% relief', description: 'Income tax relief on qualifying EIS investments.' },
                    { title: 'VCT 30% relief', description: 'Income tax relief on qualifying VCT investments.' },
                  ].map((item) => (
                    <div key={item.title} className="taxplanning-info-card">
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {taxPlanningTab === 'avoid' && (
                <div className="taxplanning-panel">
                  <div className="taxplanning-avoid-hero">
                    <p>Potential savings</p>
                    <p className="avoid-figure">£2,840</p>
                  </div>
                  <div className="taxplanning-action-list">
                    {[
                      'Review pension contributions to reduce taxable income',
                      'Use ISA allowances before investing in taxable shares',
                      'Claim all allowable business expenses and mileage',
                      'Keep proper records for self assessment to avoid penalties',
                      'Avoid taking personal expenses through the business',
                    ].map((action) => (
                      <div key={action} className="taxplanning-action-item">
                        <span>•</span>
                        <p>{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {profileModalOpen && (
        <div className="modal-overlay full-screen" role="dialog" aria-modal="true">
          <div className="modal-card profile-modal-card">
            <div className="modal-header">
              <div>
                <h2>Your Profile</h2>
                <p className="modal-subtitle">Personalise TaxSide to your situation</p>
              </div>
              <button className="modal-close" onClick={closeProfileModal} aria-label="Close profile settings">
                ✕
              </button>
            </div>
            <div className="modal-body profile-modal-body">
              <section className="profile-section">
                <h3>About You</h3>
                <div className="profile-input-grid">
                  <label>
                    Full name
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </label>
                  <label>
                    Business name
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your business name"
                    />
                  </label>
                  <label className="full-width">
                    Trade type
                    <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
                      {['Freelancer', 'Consultant', 'Tradesperson', 'Driver', 'Creative', 'Retailer', 'Other'].map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </section>

              <section className="profile-section">
                <h3>Tax Settings</h3>
                <div className="profile-input-grid">
                  <label>
                    Tax year
                    <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)}>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </label>
                  <label className="toggle-label">
                    VAT registered
                    <div className="toggle-control">
                      <input
                        type="checkbox"
                        checked={vatRegistered}
                        onChange={(e) => setVatRegistered(e.target.checked)}
                      />
                      <span>{vatRegistered ? 'Yes' : 'No'}</span>
                    </div>
                  </label>
                  <label className="full-width">
                    UTR number
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="1234567890"
                    />
                    <span className="helper-text">Your 10 digit Unique Taxpayer Reference</span>
                  </label>
                </div>
              </section>

              <section className="profile-section">
                <h3>Notifications</h3>
                <div className="profile-toggle-grid">
                  <label className="toggle-block">
                    <span>MTD deadline reminders</span>
                    <input
                      type="checkbox"
                      checked={mtdReminders}
                      onChange={(e) => setMtdReminders(e.target.checked)}
                    />
                  </label>
                  <label className="toggle-block">
                    <span>Weekly expense summary</span>
                    <input
                      type="checkbox"
                      checked={weeklySummary}
                      onChange={(e) => setWeeklySummary(e.target.checked)}
                    />
                  </label>
                  <label className="toggle-block">
                    <span>New claimable expense alerts</span>
                    <input
                      type="checkbox"
                      checked={expenseAlerts}
                      onChange={(e) => setExpenseAlerts(e.target.checked)}
                    />
                  </label>
                </div>
              </section>

              <section className="profile-section danger-zone">
                <h3>Danger Zone</h3>
                <button type="button" className="clear-data-btn" onClick={clearProfileData}>
                  Clear all data
                </button>
              </section>
            </div>
            <div className="modal-footer">
              <button className="save-profile-btn" type="button" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {expenseLibraryOpen && (
        <div className="modal-overlay full-screen" role="dialog" aria-modal="true">
          <div className="modal-card expense-library-card">
            <div className="expense-library-header">
              <div className="expense-library-header-top">
                <div>
                  <h2>Expense Library</h2>
                  <p className="expense-library-subtitle">Find what you can claim</p>
                </div>
                <button className="modal-close" onClick={closeExpenseLibrary} aria-label="Close expense library">
                  ✕
                </button>
              </div>
              <div className="expense-library-search-row">
                <input
                  className="expense-library-search"
                  type="search"
                  value={expenseLibrarySearch}
                  onChange={(e) => setExpenseLibrarySearch(e.target.value)}
                  placeholder="Search e.g. phone, fuel, laptop..."
                />
              </div>
              <div className="library-filter-row">
                {expenseLibraryTradeFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`library-filter-pill ${expenseLibraryFilter === filter ? 'active' : ''}`}
                    onClick={() => setExpenseLibraryFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="expense-library-content">
              {expenseLibrarySearch.trim() ? (
                <div className="library-search-results">
                  {expenseLibrarySearchResults.length === 0 ? (
                    <div className="library-empty-state">No matching expenses found.</div>
                  ) : (
                    expenseLibrarySearchResults.map((item) => (
                      <div key={`${item.category}-${item.name}`} className="library-item">
                        <div>
                          <p className="library-item-name">{item.name}</p>
                          <p className="library-item-description">{item.description}</p>
                          <p className="library-item-meta">{item.category}</p>
                        </div>
                        <button
                          className="library-add-btn"
                          type="button"
                          onClick={() => addExpenseFromLibrary(item, item.category)}
                        >
                          +
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="library-groups">
                  {expenseLibraryGroups.map((group) => {
                    const filteredItems = group.items.filter((item) => {
                      return expenseLibraryFilter === 'All' || item.tags.includes(expenseLibraryFilter);
                    });
                    if (filteredItems.length === 0) return null;
                    const isOpen = expenseLibraryExpanded.has(group.title);
                    return (
                      <div key={group.title} className="library-group">
                        <button
                          type="button"
                          className={`library-category-header ${isOpen ? 'open' : ''}`}
                          onClick={() => toggleExpenseLibraryCategory(group.title)}
                        >
                          <span className="library-category-icon">{group.emoji}</span>
                          <span className="library-category-title">{group.title}</span>
                          <span className="library-category-count">{filteredItems.length}</span>
                          <span className={`library-category-arrow ${isOpen ? 'open' : ''}`}>▼</span>
                        </button>
                        {isOpen && (
                          <div className="library-group-items">
                            {filteredItems.map((item) => (
                              <div key={item.name} className="library-item">
                                <div>
                                  <p className="library-item-name">{item.name}</p>
                                  <p className="library-item-description">{item.description}</p>
                                </div>
                                <button
                                  className="library-add-btn"
                                  type="button"
                                  onClick={() => addExpenseFromLibrary(item, group.title)}
                                >
                                  +
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="expense-library-footer">
              <p>💡 Tip — use the search bar to quickly find any expense by keyword</p>
              <button type="button" className="expense-library-footer-close" onClick={closeExpenseLibrary}>
                ✕
              </button>
            </div>
            {expenseLibraryToast && (
              <div className="expense-library-toast">Added to your expenses</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
