"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Building2, Landmark } from "lucide-react";

// Complete dataset of all 28 States and 8 Union Territories of India with all districts
const STATE_DISTRICTS: Record<string, string[]> = {
  "Andaman and Nicobar Islands": [
    "Nicobar", "North and Middle Andaman", "South Andaman"
  ],
  "Andhra Pradesh": [
    "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", 
    "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", 
    "Kakinada", "NTR", "Nandyal", "Palnadu", "Parvathipuram Manyam", "Prakasam", 
    "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Srikakulam", "Tirupati", 
    "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", 
    "Itanagar Capital Complex", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", 
    "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", 
    "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", 
    "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
  ],
  "Assam": [
    "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
    "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", 
    "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", 
    "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", 
    "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", 
    "Tamulpur", "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", 
    "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", 
    "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", 
    "Madhepura", "Madhubani", "Munger (Monghyr)", "Muzaffarpur", "Nalanda", "Nawada", 
    "Patna", "Purnia (Purnea)", "Rohtas", "Saharsa", "Samastipur", "Saran", 
    "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", 
    "Dantewada (South Bastar)", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", 
    "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", "Kanker (North Bastar)", 
    "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", 
    "Mohla-Manpur-Ambagarh Chowki", "Mungeli", "Narayanpur", "Raigarh", "Raipur", 
    "Rajnandgaon", "Sakti", "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli", "Daman", "Diu"
  ],
  "Delhi (NCT)": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
    "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", 
    "South West Delhi", "West Delhi"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha (Palanpur)", "Bharuch", 
    "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang (Ahwa)", "Devbhoomi Dwarka", 
    "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda (Nadiad)", "Kutch", 
    "Mahisagar", "Mehsana", "Morbi", "Narmada (Rajpipla)", "Navsari", 
    "Panchmahal (Godhra)", "Patan", "Porbandar", "Rajkot", "Sabarkantha (Himmatnagar)", 
    "Surat", "Surendranagar", "Tapi (Vyara)", "Vadodara", "Valsad"
  ],
  "Haryana": [
    "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram (Gurgaon)", 
    "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", 
    "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", 
    "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", 
    "Mandi", "Shimla", "Sirmaur (Sirmour)", "Solan", "Una"
  ],
  "Jammu and Kashmir": [
    "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", 
    "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", 
    "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
  ],
  "Jharkhand": [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", 
    "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", 
    "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", 
    "Seraikela Kharsawan", "Simdega", "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", 
    "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", 
    "Chikkamagaluru (Chickmagalur)", "Chitradurga", "Dakshina Kannada", "Davanagere", 
    "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", 
    "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shivamogga (Shimoga)", 
    "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada (Karwar)", "Vijayanagara", 
    "Vijayapura (Bijapur)", "Yadgir"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", 
    "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", 
    "Thrissur", "Wayanad"
  ],
  "Ladakh": [
    "Kargil", "Leh"
  ],
  "Lakshadweep": [
    "Lakshadweep"
  ],
  "Madhya Pradesh": [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", 
    "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", 
    "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Indore", "Jabalpur", 
    "Jhabua", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", 
    "Mauganj", "Morena", "Narsinghpur", "Narmadapuram (Hoshangabad)", "Neemuch", 
    "Niwari", "Pandhurna", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", 
    "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", 
    "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Beed", "Bhandara", "Buldhana", "Chandrapur", 
    "Chhatrapati Sambhaji Nagar (Aurangabad)", "Dharashiv (Osmanabad)", "Dhule", 
    "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", 
    "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", 
    "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", 
    "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", 
    "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", 
    "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", 
    "Eastern West Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", 
    "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", 
    "West Jaintia Hills", "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", 
    "Lunglei", "Mamit", "Saitual", "Serchhip", "Siaha"
  ],
  "Nagaland": [
    "Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", 
    "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyu", "Tuensang", 
    "Wokha", "Zunheboto"
  ],
  "Odisha": [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
    "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", 
    "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", 
    "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
    "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"
  ],
  "Puducherry": [
    "Karaikal", "Mahe", "Puducherry", "Yanam"
  ],
  "Punjab": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", 
    "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", 
    "Malerkotla", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", 
    "Sahibzada Ajit Singh Nagar (Mohali)", "Shaheed Bhagat Singh Nagar (Nawanshahr)", 
    "Sri Muktsar Sahib", "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", 
    "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", 
    "Deeg", "Dholpur", "Didwana-Kuchaman", "Dudu", "Dungarpur", "Ganganagar", 
    "Gangapur City", "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", 
    "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Kota", 
    "Kotputli-Behror", "Khairthal-Tijara", "Nagaur", "Neem Ka Thana", "Pali", 
    "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", 
    "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur"
  ],
  "Sikkim": [
    "Gangtok", "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng"
  ],
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", 
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", 
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", 
    "Viluppuram", "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial", 
    "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", 
    "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", 
    "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", 
    "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", 
    "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", 
    "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", 
    "Unakoti", "West Tripura"
  ],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", 
    "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", 
    "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", 
    "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", 
    "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", 
    "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", 
    "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", 
    "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", 
    "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", 
    "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", 
    "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", 
    "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  "Uttarakhand": [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", 
    "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", 
    "Udham Singh Nagar", "Uttarkashi"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", 
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", 
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", 
    "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", 
    "South 24 Parganas", "Uttar Dinajpur"
  ]
};

// Odisha first, then all other States/UTs in alphabetical order
const STATES = Object.keys(STATE_DISTRICTS).sort((a, b) => {
  if (a === "Odisha") return -1;
  if (b === "Odisha") return 1;
  return a.localeCompare(b);
});

export default function FranchiseForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    showroomSpace: "",
    investmentCapacity: "₹5 Lakhs - ₹10 Lakhs",
    businessBackground: "",
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateVal = e.target.value;
    setSelectedState(stateVal);
    setSelectedDistrict(""); // Reset district on state change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("IDLE");
    setErrorMessage("");

    // State validation
    if (!selectedState) {
      setErrorMessage("Please select a state.");
      setSubmitStatus("ERROR");
      setIsSubmitting(false);
      return;
    }

    // District validation
    if (!selectedDistrict) {
      setErrorMessage("Please select your proposed district / city.");
      setSubmitStatus("ERROR");
      setIsSubmitting(false);
      return;
    }

    const combinedCityString = `${selectedDistrict}, ${selectedState}`;

    try {
      const response = await fetch("/api/partnerships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "FRANCHISE",
          ...formData,
          proposedCity: combinedCityString,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application.");
      }

      setSubmitStatus("SUCCESS");
      setFormData({
        fullName: "",
        mobileNumber: "",
        emailAddress: "",
        showroomSpace: "",
        investmentCapacity: "₹5 Lakhs - ₹10 Lakhs",
        businessBackground: "",
      });
      setSelectedState("");
      setSelectedDistrict("");
    } catch (error: any) {
      console.error("Franchise submit error:", error);
      setSubmitStatus("ERROR");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDistricts = selectedState ? STATE_DISTRICTS[selectedState] || [] : [];

  if (submitStatus === "SUCCESS") {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Application Submitted Successfully!
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Thank you for your interest in partnering with Pragati EcoSolar. Our business development team will review your details and contact you within 24–48 hours to discuss the franchise opportunity.
          </p>
        </div>
        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => setSubmitStatus("IDLE")}
            className="px-6 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-md"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-3xl mx-auto space-y-6">
      <div className="border-b border-slate-100 pb-5 mb-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="w-6 h-6 text-emerald-600" />
          Franchise Application Form
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Please fill out the form below. Required fields are marked with an asterisk (*).
        </p>
      </div>

      {submitStatus === "ERROR" && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3.5 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobileNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            required
            pattern="[0-9]{10}"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="emailAddress" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            required
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all"
          />
        </div>

        {/* State Select */}
        <div>
          <label htmlFor="state" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            State / Union Territory *
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            required
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">-- Select State / UT --</option>
            {STATES.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Proposed City / District Select */}
        <div>
          <label htmlFor="proposedDistrict" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Proposed City / District *
          </label>
          <select
            id="proposedDistrict"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            required
            disabled={!selectedState}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="">
              {!selectedState ? "-- Select a state first --" : `-- Select District in ${selectedState} --`}
            </option>
            {availableDistricts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {/* Showroom Space */}
        <div>
          <label htmlFor="showroomSpace" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Showroom / Office Space Available (sq. ft.)
          </label>
          <input
            type="number"
            id="showroomSpace"
            name="showroomSpace"
            value={formData.showroomSpace}
            onChange={handleChange}
            placeholder="e.g. 500, 1000 (leave blank if none)"
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all"
          />
        </div>

        {/* Investment Capacity */}
        <div className="md:col-span-2">
          <label htmlFor="investmentCapacity" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Investment Capacity
          </label>
          <select
            id="investmentCapacity"
            name="investmentCapacity"
            value={formData.investmentCapacity}
            onChange={handleChange}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="₹5 Lakhs - ₹10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
            <option value="₹10 Lakhs - ₹25 Lakhs">₹10 Lakhs - ₹25 Lakhs</option>
            <option value="₹25 Lakhs+">₹25 Lakhs+</option>
          </select>
        </div>
      </div>

      {/* Business Background */}
      <div>
        <label htmlFor="businessBackground" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Business Background / Experience
        </label>
        <textarea
          id="businessBackground"
          name="businessBackground"
          rows={4}
          value={formData.businessBackground}
          onChange={handleChange}
          placeholder="Briefly describe your current business, experience in retail, electrical, solar, or other sectors."
          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none transition-all resize-y"
        />
      </div>

      {/* Information strip */}
      <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex gap-3 text-xs text-amber-850">
        <Landmark className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold">Franchise Benefits:</strong>
          <p className="leading-relaxed font-medium text-slate-700">
            Odisha's solar industry is expanding rapidly under PM Surya Ghar. Our franchise program offers comprehensive technical training, lead allocation support, marketing kits, and DISCOM net-metering assistance.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-[0.98] text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-amber-500/15 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Franchise Application</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
