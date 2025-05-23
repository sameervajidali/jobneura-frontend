export const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna",
  "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli",
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Prayagraj",
  "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli–Dharwad", "Bareilly", "Moradabad", "Mysuru", "Gurgaon",
  "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar", "Thiruvananthapuram",
  "Bhiwandi", "Saharanpur", "Guntur", "Amravati", "Noida", "Jamshedpur", "Bhiwani", "Warangal", "Cuttack",
  "Firozabad", "Kochi", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Nanded", "Kolhapur", "Ajmer",
  "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Nellore", "Jammu",
  "Sangli", "Belgaum", "Mangalore", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur",
  "Maheshtala", "Davanagere", "Kozhikode", "Akola", "Kurnool", "Bokaro Steel City", "Rajpur Sonarpur",
  "South Dumdum", "Bellary", "Patiala", "Gopalpur", "Agartala", "Bhagalpur", "Muzaffarnagar", "Bhatpara",
  "Panihati", "Latur", "Dhule", "Rohtak", "Korba", "Bhilwara", "Berhampur", "Muzaffarpur", "Ahmednagar",
  "Mathura", "Kollam", "Avadi", "Kadapa", "Anantapur", "Kamarhati", "Bilaspur", "Sambalpur", "Shahjahanpur",
  "Satara", "Bijapur", "Rampur", "Shivamogga", "Chandrapur", "Junagadh", "Thrissur", "Alwar", "Bardhaman",
  "Kulti", "Nizamabad", "Parbhani", "Tumkur", "Khammam", "Ozhukarai", "Bihar Sharif", "Panipat",
  "Darbhanga", "Bally", "Aizawl", "Dewas", "Ichalkaranji", "Karnal", "Bathinda", "Jalna", "Eluru", "Barasat",
  "Kirari Suleman Nagar", "Purnia", "Satna", "Mau", "Sonipat", "Farrukhabad", "Sagar", "Rourkela", "Durg",
  "Imphal", "Ratlam", "Hapur", "Arrah", "Anand", "Bhagalpur", "Karimnagar", "Etawah", "Ambarnath",
  "North Dumdum", "Bharatpur", "Begusarai", "New Delhi", "Gandhidham", "Baranagar", "Tirupati", "Pali",
  "Sikar", "Unnao", "Loni", "Cuttack", "Raichur", "Panvel", "Yamunanagar", "Bally", "Bidar", "Munger",
  "Raiganj", "Bhind", "Pune Cantonment", "Deoghar", "Chhapra", "Bongaigaon", "Jorhat", "Serampore",
  "Alappuzha", "Bulandshahr", "Budaun", "Gonda", "Raebareli", "Khandwa", "Pilibhit", "Palwal", "Mandsaur",
  "Kharagpur", "Guna", "Kishanganj", "Jamnagar", "Giridih", "Shivpuri", "Barshi", "Jejuri", "Porbandar",
  "Sultanpur", "Gondia", "Bahraich", "Hindupur", "Hasanpur", "Bidar", "Rae Bareli", "Gurugram", "Rajnandgaon",
  "Shimoga", "Dibrugarh", "Hajipur", "Port Blair", "Churachandpur", "Banswara", "Gopalganj", "Hoshiarpur",
  "Sangrur", "Katihar", "Baripada", "Kumbakonam", "Bettiah", "Jaunpur", "Nagaon", "Navsari", "Yavatmal",
  "Bankura", "Neemuch", "Balasore", "Baran", "Palakkad", "Buxar", "Puri", "Gangtok", "Burhanpur", "Jind",
  "Hazaribagh", "Bhiwani", "Karaikudi", "Kishangarh", "Vidisha", "Sehore", "Rajnandgaon", "Bhandara",
  "Mandya", "Chittoor", "Dibrugarh", "Hajipur", "Alappuzha", "Sivakasi", "Mahabubnagar", "Raigarh", "Kavali",
  "Gadwal", "Bijapur", "Basti", "Sonbhadra", "Karimnagar", "Muzaffarnagar", "Satara", "Bagalkot", "Thanjavur",
  "Dindigul", "Khargone", "Katni", "Beed", "Ambikapur", "Nalgonda", "Palwal", "Botad", "Sagar", "Satna",
  "Hardoi", "Mirzapur", "Balurghat", "Haldia", "Kishangarh", "Barabanki", "Dhamtari", "Munger", "Damoh",
  "Jhunjhunu", "Jhalawar", "Medininagar", "Chikmagalur", "Mandla", "Jalna", "Lakhimpur", "Gopalganj",
  "Bhuj", "Rajsamand", "Koraput", "Dausa", "Kottayam", "Palwal", "Bankura", "Jhargram", "Patan", "Tonk",
  "Nagapattinam", "Buxar", "Bahadurgarh", "Pilibhit", "Bhilai", "Muzaffarpur", "Anand", "Banda", "Purnea",
  "Nawada", "Fatehpur", "Ramanathapuram", "Kangra", "Latur", "Buldhana", "Bhind", "Tikamgarh", "Bettiah",
  "Parbhani", "Mahbubnagar", "Rewa", "Shivpuri", "Nashik Road", "Tinsukia", "Barmer", "Nanded-Waghala",
  "Ambala", "Jamshedpur", "Dibrugarh", "Fatehabad", "Jhalawar", "Angul", "Motihari", "Nawanshahr", "Jhabua",
  "Sitapur", "Unnao", "Bilaspur", "Bhandara", "Kawardha", "Pathankot", "Jorhat", "Muzaffarnagar",
  "Nainital", "Sonipat", "Rajgarh", "Buxar", "Mahasamund", "Sibsagar", "Mahesana", "Madhepura", "Deoria",
  "Kishanganj", "Chikodi", "Vidisha", "Tezpur", "Sitamarhi", "Chhatarpur", "Gonda", "Chandrapur",
  "Bhiwani", "Raebareli", "Muzaffarnagar", "Baramati", "Murwara", "Sikar", "Nanded", "Nalgonda", "Amreli",
  "Purnea", "Sonbhadra", "Hoshangabad", "Kakinada", "Aurangabad", "Chittorgarh", "Madhubani", "Mathura",
  "Banda", "Khandwa", "Jagdalpur", "Madikeri", "Dewas", "Sitapur", "Sagar", "Korba", "Khanna", "Rampurhat",
  "Guntur", "Palakkad", "Chikkamagaluru", "Sitamarhi", "Amroha", "Firozabad", "Madanapalle", "Kozhikode",
  "Dhanbad", "Vellore", "Pilibhit", "Kendrapara", "Rangareddy", "Muzaffarpur", "Baripada", "Rae Bareli"
  // ...You can continue to add more, but these 400+ cover almost every major urban hub in India.
];
