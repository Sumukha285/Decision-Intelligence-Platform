import { DomainData } from '../types';

export const DOMAINS: DomainData[] = [
  {
    id: 'mobility',
    name: 'Urban Mobility & Transportation',
    category: 'Infrastructure',
    iconName: 'Car',
    summary: 'Optimize multi-modal transit networks, decrease traffic congestion, reduce commuter transit times, and boost micro-mobility adoption.',
    metrics: [
      { id: 'congestion', name: 'Congestion Rate', value: 42, unit: '%', change: '+2.4%', trend: 'up', status: 'warning', description: 'Average percentage of roadway operating above capacity during rush hours.' },
      { id: 'transit_ridership', name: 'Public Transit Ridership', value: 68, unit: 'k/day', change: '+5.1%', trend: 'up', status: 'good', description: 'Daily active boardings on buses, light rail, and express shuttles.' },
      { id: 'commute_time', name: 'Avg Commute Time', value: 34, unit: 'min', change: '-1.5%', trend: 'down', status: 'good', description: 'Mean one-way travel duration for commuters in metropolitan zones.' }
    ],
    sliders: [
      { id: 'transit_subsidy', name: 'Transit Fare Subsidies', min: 0, max: 100, value: 30, step: 10, unit: '%', description: 'Percentage subsidy applied to light rail and city bus fares.' },
      { id: 'congestion_pricing', name: 'Peak Congestion Pricing', min: 0, max: 20, value: 5, step: 1, unit: '$', description: 'Base charge for personal vehicles entering high-density corridors.' },
      { id: 'mobility_lanes', name: 'Dedicated Transit & Bike Lanes', min: 50, max: 500, value: 150, step: 25, unit: 'mi', description: 'Total mileage of dedicated lanes allocated strictly for buses and micromobility.' }
    ],
    scenarios: [
      { id: 'green_commute', name: 'Eco-Transit Surge', description: 'Maximize transit subsidies and dedicated micromobility lanes to disincentivize private car usage.', sliders: { transit_subsidy: 80, congestion_pricing: 12, mobility_lanes: 400 }, metricsDelta: { congestion: -0.45, transit_ridership: 1.35, commute_time: -0.2 } },
      { id: 'car_centric', name: 'Deregulated Transit', description: 'Minimize transit subsidies and pricing to reduce immediate municipal spending, risking peak grids.', sliders: { transit_subsidy: 10, congestion_pricing: 0, mobility_lanes: 80 }, metricsDelta: { congestion: 1.25, transit_ridership: -0.3, commute_time: 1.15 } }
    ],
    visionPresets: [
      { id: 'cam_mobility_1', title: 'Main St Intersection (Simulated CCTV)', imageUrl: '/src/assets/images/traffic_congestion_1783264668157.jpg', description: 'Real-time street security camera monitoring peak traffic congestion.', promptHint: 'Analyze the density of vehicles, crosswalk safety, and count visible cars/buses. Provide traffic flow optimization tips.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'mobility_circular', title: 'Transit Optimization Advisory', type: 'Policy Brief', description: 'Draft a municipal mandate to deploy adaptive signal timers and adjust fare structures.', defaultInputs: { target_corridor: 'Main Street Sector 4', budget_allocation: '$2.4 Million', implementation_deadline: '6 Months' } }
    ],
    knowledgeBase: `URBAN MOBILITY AND MULTI-MODAL SYSTEMS POLICIES (v4.2):
- Adding dedicated bus rapid transit (BRT) lanes decreases general congestion on average by 18% in the surrounding grid within 3 months of deployment.
- Reducing transit fare subsidies to under 20% consistently drops ridership of lower-income cohorts by 35%, shifting traffic patterns heavily onto parallel freeways.
- Congestion pricing charges above $8.00 per entry during peak hours reduce single-occupancy vehicle traffic into central commercial districts by up to 28% while generating approximately $140,000 in daily infrastructure reinvestment capital.`
  },
  {
    id: 'safety',
    name: 'Public Safety & Emergency Prep',
    category: 'Governance & Services',
    iconName: 'ShieldAlert',
    summary: 'Coordinate municipal defense, reduce emergency response times, enhance smart risk-monitoring sensors, and build community-led hazard readiness.',
    metrics: [
      { id: 'response_time', name: 'Emergency Response Time', value: 8.5, unit: 'min', change: '-4.2%', trend: 'down', status: 'good', description: 'Mean time elapsed from 911 dispatch trigger to unit arrival on-scene.' },
      { id: 'sensor_coverage', name: 'Smart Threat Sensor Grid', value: 64, unit: '%', change: '+12%', trend: 'up', status: 'warning', description: 'Percent of critical urban zones covered by smart acoustic, water level, and thermal threat sensors.' },
      { id: 'community_drills', name: 'Emergency Drill Participation', value: 2800, unit: 'residents', change: '+25%', trend: 'up', status: 'neutral', description: 'Total unique citizens completing municipal civil defense workshops this quarter.' }
    ],
    sliders: [
      { id: 'cop_budget', name: 'Community Patrol & Support Allocation', min: 10, max: 150, value: 85, step: 5, unit: '$M', description: 'Budget earmarked for local safety officers and trauma response specialists.' },
      { id: 'sensor_density', name: 'IoT Threat Sensor Rollout', min: 10, max: 100, value: 65, step: 5, unit: '%', description: 'Target sensor network deployment density in high-risk zones.' },
      { id: 'preparedness_drills', name: 'Civil Protection Drills', min: 1, max: 12, value: 4, step: 1, unit: '/yr', description: 'Frequency of community-wide evacuation and storm preparedness drills.' }
    ],
    scenarios: [
      { id: 'smart_shield', name: 'Resilient Smart Safety', description: 'Combine dense IoT hazard monitoring arrays with high-frequency citizen readiness training.', sliders: { cop_budget: 110, sensor_density: 95, preparedness_drills: 8 }, metricsDelta: { response_time: -0.25, sensor_coverage: 1.4, community_drills: 1.8 } },
      { id: 'reactive_safety', name: 'Conventional Patrol Focus', description: 'Shift resources toward high patrol budgets with minimal tech coverage or public workshop investments.', sliders: { cop_budget: 140, sensor_density: 20, preparedness_drills: 1 }, metricsDelta: { response_time: -0.05, sensor_coverage: -0.6, community_drills: -0.5 } }
    ],
    visionPresets: [
      { id: 'cam_safety_1', title: 'Flood Risk Monitoring (Simulated Feed)', imageUrl: '/src/assets/images/street_accessibility_1783264708667.jpg', description: 'Street level camera viewing drainage, pavement structures, and flood susceptibility.', promptHint: 'Examine drainage grids, asphalt pooling hazards, or structural barriers. Offer storm hazard risk mitigations.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'safety_notice', title: 'Smart Threat Response Framework', type: 'Alert Circular', description: 'Generate emergency response procedures or severe-weather warnings based on current threat sensors.', defaultInputs: { hazard_type: 'Severe Surface Flood Hazard', emergency_contact: 'Sector-B Support Command', safe_shelter_zones: 'Community Halls 2, 4 and 9' } }
    ],
    knowledgeBase: `PUBLIC SAFETY & EMERGENCY COORDINATION ACT:
- IoT sensor networks (acoustic/fire/flood) decrease deployment latency of safety services by 2.1 minutes by triggering dispatch automatically prior to 911 phone calls.
- Highly visible community-led safety programs have been shown to reduce misdemeanor incident rates in residential quadrants by 15-22% over 18 months.
- Regular preparedness exercises increase the rate of successful structural evacuation speed by 40% during real fire or flash-flooding crises.`
  },
  {
    id: 'healthcare',
    name: 'Healthcare Access & Wellness',
    category: 'Community Wellbeing',
    iconName: 'HeartPulse',
    summary: 'Bridge health equity, deploy mobile clinical vans, fund telemedicine infrastructure, and provide community nutrition assistance.',
    metrics: [
      { id: 'access_rate', name: 'Healthcare Access Rate', value: 74, unit: '%', change: '+3.1%', trend: 'up', status: 'good', description: 'Percentage of residents within a 15-minute walk/ride of primary health facilities.' },
      { id: 'chronic_index', name: 'Preventable Illness Rate', value: 18.2, unit: '%', change: '-2.0%', trend: 'down', status: 'good', description: 'Percent of active emergency room visits resulting from preventable chronic triggers.' },
      { id: 'nutrition_subsidy', name: 'Healthy Food Assistance', value: 1200, unit: 'families', change: '+15%', trend: 'up', status: 'neutral', description: 'Subsidized fresh produce distribution beneficiaries in food deserts.' }
    ],
    sliders: [
      { id: 'mobile_clinics', name: 'Mobile Clinic Vans', min: 0, max: 25, value: 6, step: 1, unit: 'vans', description: 'Fleets of fully equipped mobile clinics visiting underserved districts weekly.' },
      { id: 'telehealth_subsidy', name: 'Telehealth Access Credits', min: 0, max: 10, value: 4, step: 1, unit: '$M', description: 'Funding to distribute free broadband-enabled smart tablets for low-income telehealth.' },
      { id: 'wellness_programs', name: 'Neighborhood Wellness Centers', min: 1, max: 15, value: 5, step: 1, unit: 'centers', description: 'Active community physical wellness and nutrition counseling installations.' }
    ],
    scenarios: [
      { id: 'wellness_equity', name: 'Equitable Health Access', description: 'Deploy aggressive mobile medical services and subsidized local wellness centers directly in food deserts.', sliders: { mobile_clinics: 20, telehealth_subsidy: 8, wellness_programs: 12 }, metricsDelta: { access_rate: 1.25, chronic_index: -0.35, nutrition_subsidy: 1.5 } },
      { id: 'centralized_health', name: 'Centralized Clinic Focus', description: 'Reduce localized mobile clinic fleets and rely primarily on existing centralized downtown hospitals.', sliders: { mobile_clinics: 2, telehealth_subsidy: 1, wellness_programs: 2 }, metricsDelta: { access_rate: -0.15, chronic_index: 0.25, nutrition_subsidy: -0.4 } }
    ],
    visionPresets: [
      { id: 'cam_health_1', title: 'Community Green Roof & Wellness Hub', imageUrl: '/src/assets/images/solar_panels_1783264694589.jpg', description: 'Aerial scan of apartment complex solar roofing integrated with active urban green zones.', promptHint: 'Assess the ratio of green vegetative space to solar setups. Identify potentials for communal wellness spaces and gardening.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'health_equity', title: 'Mobile Clinic Deployment Strategy', type: 'Policy Brief', description: 'Define routes, operating hours, and localized clinical programs for mobile health fleets.', defaultInputs: { focal_quadrant: 'East Side Ward 7', primary_care_focus: 'Pediatric Care & Diabetes Screenings', launch_date: 'Next Calendar Quarter' } }
    ],
    knowledgeBase: `HEALTH EQUITY & MUNICIPAL WELLNESS INITIATIVES:
- Every active mobile health van deployed to identified health deserts reduces surrounding emergency room non-urgent usage by 11.4 visits daily.
- Subsidized high-speed internet and tablets dedicated to remote telehealth reduce chronic cardiovascular patient re-hospitalization rates by 19%.
- Local health centers hosting preventative diet and active living programs offset municipal long-term obesity and type-2 diabetes medical costs by $3.20 for every $1 invested.`
  },
  {
    id: 'education',
    name: 'Education & Lifelong Learning',
    category: 'Community Wellbeing',
    iconName: 'GraduationCap',
    summary: 'Elevate graduation rates, increase localized digital literacy training, and fund adult education and teacher incentives.',
    metrics: [
      { id: 'grad_rate', name: 'High School Graduation', value: 84.5, unit: '%', change: '+0.8%', trend: 'up', status: 'neutral', description: 'Four-year cohort graduation rate in municipal public school districts.' },
      { id: 'digital_literacy', name: 'Digital Literacy Score', value: 62, unit: '%', change: '+4.5%', trend: 'up', status: 'warning', description: 'Percent of senior and adult residents demonstrating basic software and internet proficiency.' },
      { id: 'afterschool_reach', name: 'Afterschool Reach Rate', value: 41, unit: '%', change: '+8.2%', trend: 'up', status: 'good', description: 'Percent of enrolled school-age children participating in STEM or arts extracurricular programs.' }
    ],
    sliders: [
      { id: 'tech_funding', name: 'Digital Classroom Funding', min: 1, max: 20, value: 6, step: 1, unit: '$M', description: 'Earmarks for school hardware upgrades, robotics kits, and interactive software.' },
      { id: 'adult_centers', name: 'Lifelong Learning Centers', min: 1, max: 12, value: 4, step: 1, unit: 'centers', description: 'Vocational retraining and digital skill clinics operating in community hubs.' },
      { id: 'teacher_incentive', name: 'Teacher Retention Supplements', min: 0, max: 10000, value: 3500, step: 500, unit: '$/yr', description: 'Annual salary supplement for accredited teachers working in underperforming schools.' }
    ],
    scenarios: [
      { id: 'learning_revolution', name: 'Vibrant EdTech & Retraining', description: 'Maximally fund digital classrooms and adult learning programs with strong teacher retention bonuses.', sliders: { tech_funding: 18, adult_centers: 10, teacher_incentive: 8000 }, metricsDelta: { grad_rate: 1.12, digital_literacy: 1.45, afterschool_reach: 1.35 } }
    ],
    visionPresets: [
      { id: 'cam_edu_1', title: 'Community Science Lab (Simulated Class)', imageUrl: '/src/assets/images/solar_panels_1783264694589.jpg', description: 'Community science lab with solar experimental kits in a modern school yard.', promptHint: 'Inspect safety setups, student project kits, or clean equipment placements. Analyze visual student engagement layout.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'edu_mandate', title: 'Digital Retraining Curriculum Draft', type: 'Policy Brief', description: 'Structure an eight-week computer skill and trade retraining catalog for local community centers.', defaultInputs: { focal_skill: 'Civic Data Literacy & Web Navigation', center_targets: 'West-Ward Retraining Centers', target_enrollees: 'Ages 35-65 Retraining Cohorts' } }
    ],
    knowledgeBase: `MUNICIPAL EDUCATION RETENTION AND VOCATIONAL POLICIES:
- Funding teacher retention bonuses of $5,000+ per year reduces public school instructor turnover rates by 48%, stabilizing student achievement metrics.
- Establishing neighborhood digital trade classrooms boosts low-income wage acquisition by average of 14% within 180 days of course completion.
- Interactive learning labs with active STEM kits double local secondary school interest in science major pathways.`
  },
  {
    id: 'environment',
    name: 'Environmental Sustainability',
    category: 'Infrastructure',
    iconName: 'Leaf',
    summary: 'Manage carbon sequestration grids, improve metropolitan air quality index (AQI), and mitigate urban heat island hazards.',
    metrics: [
      { id: 'aqi', name: 'Air Quality Index (AQI)', value: 54, unit: 'pts', change: '-4.8%', trend: 'down', status: 'good', description: 'Daily mean particulate matter (PM2.5) indicator. Lower is better/healthier.' },
      { id: 'canopy', name: 'Urban Tree Canopy Coverage', value: 22, unit: '%', change: '+0.5%', trend: 'up', status: 'warning', description: 'Percent of city land shaded by healthy mature tree canopies.' },
      { id: 'carbon_offset', name: 'Carbon Sequestration', value: 14.2, unit: 'k-tons/yr', change: '+3.1%', trend: 'up', status: 'neutral', description: 'Annual volume of greenhouse gas offset by municipal green systems.' }
    ],
    sliders: [
      { id: 'tree_planting', name: 'Afforestation Budget', min: 0.5, max: 10, value: 2.5, step: 0.5, unit: '$M', description: 'Earmarks for street-tree and community-orchard expansion planting.' },
      { id: 'green_roofs', name: 'Green Roof Construction Rebate', min: 0, max: 50, value: 15, step: 5, unit: '$/sqft', description: 'Developer incentives to integrate vegetative layers onto new rooftops.' },
      { id: 'emission_cap', name: 'Commercial Building Emission Cap', min: 10, max: 100, value: 40, step: 5, unit: 'kg/m²', description: 'Maximum allowable annual carbon footprint index for large commercial buildings.' }
    ],
    scenarios: [
      { id: 'urban_forest', name: 'Intense Green Canopy', description: 'Fund heavy tree planting and green roof rebates while imposing rigid low-emission commercial building caps.', sliders: { tree_planting: 8.5, green_roofs: 40, emission_cap: 20 }, metricsDelta: { aqi: -0.4, canopy: 1.35, carbon_offset: 1.6 } }
    ],
    visionPresets: [
      { id: 'cam_env_1', title: 'Urban Rooftop Vegetation Scan', imageUrl: '/src/assets/images/solar_panels_1783264694589.jpg', description: 'High-altitude rooftop drone assessment of solar panel coverage alongside thriving green moss/sedum vegetation.', promptHint: 'Assess the percent coverage of healthy plant life next to solar installations. Offer environmental sustainability ratings.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'env_mandate', title: 'Green Roof Construction Policy', type: 'Policy Brief', description: 'Generate architectural guidelines and tax incentives for commercial developers.', defaultInputs: { mandatory_threshold: 'Buildings over 12,000 sq ft', subsidy_payout: '$35/sqft', auditing_agency: 'Municipal Carbon Task Force' } }
    ],
    knowledgeBase: `URBAN CLIMATE ADAPTATION & URBAN FORESTRY ACT:
- Every 5% increase in urban tree canopy reduces average summer surface temperatures in paved zones by 1.8°C, lowering city air conditioning grid strain.
- Green roof retrofits filter 75% of particulate matter from local rainfall runoff, preventing heavy storm chemical dumping into drinking reservoirs.
- Strict building emission caps below 30 kg CO₂/m² accelerate commercial building heating-cooling energy retrofits by 4x.`
  },
  {
    id: 'waste',
    name: 'Waste Management & Resource Prep',
    category: 'Infrastructure',
    iconName: 'Trash2',
    summary: 'Increase landfill waste diversion rates, lower recycling contamination, and reduce urban methane emissions from organic rot.',
    metrics: [
      { id: 'diversion', name: 'Landfill Diversion Rate', value: 31, unit: '%', change: '+2.1%', trend: 'up', status: 'warning', description: 'Percentage of total municipal solid waste successfully composted, recycled, or recovered.' },
      { id: 'contamination', name: 'Recycle Contamination', value: 24, unit: '%', change: '-3.2%', trend: 'down', status: 'good', description: 'Percent of recyclables rejected due to food grease, hazardous materials, or improper sorting.' },
      { id: 'methane_em', name: 'Organic Methane Index', value: 82, unit: 'ppm', change: '+4.0%', trend: 'up', status: 'critical', description: 'Methane gas volume registered near landfills from decomposing organic kitchen waste.' }
    ],
    sliders: [
      { id: 'organic_bins', name: 'Compost Organics Bins Rollout', min: 10, max: 100, value: 45, step: 5, unit: '%', description: 'Percentage of municipal homes equipped with mandatory organic waste collection bins.' },
      { id: 'recycle_frequency', name: 'Recycling Collection Frequency', min: 1, max: 4, value: 2, step: 1, unit: '/wk', description: 'Weekly frequency of standard sorted-recycling pickups.' },
      { id: 'bag_fee', name: 'Single-Use Plastic Bag Fee', min: 0, max: 50, value: 10, step: 5, unit: '¢', description: 'Assessed consumer surcharge on retail plastic shopping bags.' }
    ],
    scenarios: [
      { id: 'zero_waste', name: 'Circular Zero-Waste Policy', description: 'Saturate neighborhoods with organic composting bins, double pickup frequencies, and institute a 25¢ plastic bag fee.', sliders: { organic_bins: 90, recycle_frequency: 4, bag_fee: 25 }, metricsDelta: { diversion: 1.55, contamination: -0.4, methane_em: -0.45 } }
    ],
    visionPresets: [
      { id: 'cam_waste_1', title: 'Public Sorting Facility (Simulated CCTV)', imageUrl: '/src/assets/images/waste_dump_1783264682182.jpg', description: 'Main sorting bay camera overlooking trash containers to detect cardboard, paper, or plastic contamination.', promptHint: 'Examine visible bins for sorting accuracy. Identify misclassified items and outline safety/sorting recommendations.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'waste_warning', title: 'Commercial Sorting Directive', type: 'Public Notice', description: 'Issue sorting standards to restaurants and grocery stores regarding composting.', defaultInputs: { target_sector: 'Hospitality and Grocery Retail', contamination_penalty: '$500 Flat Fee', enforcement_date: 'Within 90 Days' } }
    ],
    knowledgeBase: `SOLID WASTE RECOVERY AND ORGANIC COMPOST REGULATORY ACT:
- Curbside organic compost collection cuts residential landfill haul mass by up to 33%, immediately reducing regional landfill methane emissions.
- Surcharges of 10¢ or higher per single-use plastic bag trigger a rapid 82% consumer shift toward reusable cloth totes within 6 months.
- Sorting facility scanning alerts reduce average paper contamination down to less than 12%, preserving market recycling values.`
  },
  {
    id: 'energy',
    name: 'Energy Efficiency & Smart Grid',
    category: 'Infrastructure',
    iconName: 'Zap',
    summary: 'Manage microgrid loads, reduce city-wide peak demand spikes, transition utility grids to green solar, and subsidize home LED conversions.',
    metrics: [
      { id: 'renew_ratio', name: 'Renewable Power Ratio', value: 38, unit: '%', change: '+4.5%', trend: 'up', status: 'neutral', description: 'Percentage of city utility grid power sourced from wind, solar, and local microgrids.' },
      { id: 'peak_demand', name: 'Peak Grid Load Strain', value: 89, unit: 'pts', change: '+1.5%', trend: 'up', status: 'critical', description: 'Stress index during extreme weather hours. Values above 85 increase brownout risks.' },
      { id: 'building_eff', name: 'Building Efficiency Index', value: 58, unit: '%', change: '+2.1%', trend: 'up', status: 'warning', description: 'Percentage of structures meeting smart insulated heating/cooling standards.' }
    ],
    sliders: [
      { id: 'smart_grid_spend', name: 'Smart Utility Infrastructure', min: 5, max: 100, value: 40, step: 5, unit: '$M', description: 'Investment in computerized battery buffer banks and smart meters.' },
      { id: 'led_retrofits', name: 'LED Streetlight Retrofits', min: 20, max: 100, value: 75, step: 5, unit: '%', description: 'Percent of streetlights upgraded to light-sensor LED fixtures.' },
      { id: 'retrofit_rebates', name: 'Building Insulation Rebates', min: 100, max: 2000, value: 500, step: 100, unit: '$/unit', description: 'Rebate voucher value for residential thermal insulation and smart thermostats.' }
    ],
    scenarios: [
      { id: 'grid_modern', name: 'Supercharged Green Smart Grid', description: 'Deploy state-of-the-art smart grids and maximize thermal rebates to cushion absolute seasonal peak loads.', sliders: { smart_grid_spend: 95, led_retrofits: 100, retrofit_rebates: 1800 }, metricsDelta: { renew_ratio: 1.45, peak_demand: -0.35, building_eff: 1.38 } }
    ],
    visionPresets: [
      { id: 'cam_energy_1', title: 'Solar Array Performance (Thermal Overlay)', imageUrl: '/src/assets/images/solar_panels_1783264694589.jpg', description: 'Visual thermal evaluation drone looking at solar grid components.', promptHint: 'Assess the solar cell thermal distribution. Note clean energy capacity and detect dirty panels or shading.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'energy_retrofit_notice', title: 'Insulation Rebate Flyer Draft', type: 'Public Notice', description: 'Generate community-oriented program announcements detailing smart thermostat rebate claims.', defaultInputs: { maximum_subsidy: '$1,800 Per Residence', eligible_zipcodes: 'All Metropolitan Wards', contact_hotline: '1-800-SMART-GRID' } }
    ],
    knowledgeBase: `SMART UTILITIES & MICROGRID OPERATION PROCEDURES:
- Smart grid battery installations absorb peak solar surpluses during midday, decreasing regional substation brownouts during peak 6 PM to 9 PM window by 74%.
- Replacing municipal streetlights with LED modules cuts surrounding public electrical bills by 38%, paying off installation capital in under 22 months.
- Upgrading standard home insulation levels directly reduces individual household monthly climate utility heating-cooling fees by $45 on average.`
  },
  {
    id: 'engagement',
    name: 'Citizen Engagement',
    category: 'Governance & Services',
    iconName: 'Users',
    summary: 'Incorporate direct digital governance pipelines, organize localized civic assemblies, and improve resident service feedback scores.',
    metrics: [
      { id: 'feedback_sat', name: 'Citizen Satisfaction Score', value: 52, unit: '%', change: '-1.2%', trend: 'down', status: 'warning', description: 'Percent of surveyed residents expressing high satisfaction with public city services.' },
      { id: 'assemblies_count', name: 'Civic Assembly Reach', value: 1400, unit: 'attendees', change: '+18%', trend: 'up', status: 'neutral', description: 'Monthly citizen turnout at neighborhood zoning and funding workshops.' },
      { id: 'digital_adoption', name: 'Digital Portal Utilization', value: 39, unit: '%', change: '+5.2%', trend: 'up', status: 'warning', description: 'Percentage of municipal services and permit filings processed completely online.' }
    ],
    sliders: [
      { id: 'egov_budget', name: 'Digital E-Gov App Portal', min: 1, max: 15, value: 4, step: 1, unit: '$M', description: 'Development funding to centralize city services into an offline-friendly, accessible mobile app.' },
      { id: 'civic_assemblies', name: 'Funded Neighborhood Assemblies', min: 2, max: 50, value: 12, step: 2, unit: 'assemblies', description: 'Number of active community citizen panels with direct regulatory feedback powers.' },
      { id: 'civic_tech_grants', name: 'Civic Tech Innovator Grants', min: 100, max: 1500, value: 400, step: 100, unit: '$k', description: 'Grants allocated for local programmers, designers, and community organizers.' }
    ],
    scenarios: [
      { id: 'direct_democracy', name: 'Connected Civic Democracy', description: 'Establish dense local assemblies and launch an optimized e-governance app with strong civic technology grants.', sliders: { egov_budget: 12, civic_assemblies: 40, civic_tech_grants: 1200 }, metricsDelta: { feedback_sat: 1.35, assemblies_count: 1.6, digital_adoption: 1.55 } }
    ],
    visionPresets: [
      { id: 'cam_engage_1', title: 'Community Hall Gathering (Simulated CCTV)', imageUrl: '/src/assets/images/street_accessibility_1783264708667.jpg', description: 'Sidewalk entry viewing accessible entrances for community workshop halls.', promptHint: 'Examine layout accessibility. Note structural barriers, tactile aids, ramp widths, and security parameters.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'civic_circular', title: 'Neighborhood Budget Hearing Call', type: 'Public Notice', description: 'Draft an official bulletin inviting local residents to vote on local urban projects.', defaultInputs: { assembly_location: 'Sector-4 Community Center', primary_agenda: 'Zoning & Park Funding Allocations', date_time: 'July 15th at 7:00 PM' } }
    ],
    knowledgeBase: `DIGITAL CITIZEN ENGAGEMENT AND REFORM INITIATIVES:
- Upgrading to direct digital e-permits drops licensing wait times from 45 days down to less than 24 hours, increasing small business compliance by 28%.
- Empowering neighborhood citizen councils with direct zoning voting rights correlates with a 45% increase in community approval rates for public housing projects.
- Civic technology grants mobilize developer networks to deploy high-value local disaster alert and air quality tracking apps at 10% of typical cost.`
  },
  {
    id: 'accessibility',
    name: 'Accessibility & Inclusion',
    category: 'Community Wellbeing',
    iconName: 'Accessibility',
    summary: 'Upgrade sidewalk ramps to tactile standards, subsidize accessible low-income transit passes, and expand braille and sign indicators.',
    metrics: [
      { id: 'tactile_ramps', name: 'Tactile Sidewalk Ramps', value: 46, unit: '%', change: '+1.8%', trend: 'up', status: 'warning', description: 'Percentage of street intersections equipped with ADA-compliant textured warning tiles.' },
      { id: 'accessible_transit', name: 'Accessible Public Transit', value: 61, unit: '%', change: '+3.4%', trend: 'up', status: 'neutral', description: 'Percent of bus/rail stops fully accessible via elevators, audio cues, or mechanical lifts.' },
      { id: 'inclusive_employment', name: 'Inclusive Job Placements', value: 310, unit: 'placements', change: '+12%', trend: 'up', status: 'good', description: 'Unique disabled residents placed into stable jobs through municipal support programs.' }
    ],
    sliders: [
      { id: 'ramp_budget', name: 'Sidewalk Curb Ramp Retrofits', min: 1, max: 20, value: 5, step: 1, unit: '$M', description: 'Earmarks to tear down concrete barriers and lay yellow tactile warning curbs.' },
      { id: 'low_income_passes', name: 'Low-Income Transit Subsidies', min: 10, max: 100, value: 40, step: 5, unit: '%', description: 'Transit fare reduction percentage for disabled or low-income cardholders.' },
      { id: 'braille_indicators', name: 'Braille & Audio Guide Upgrades', min: 100, max: 1500, value: 350, step: 50, unit: '$k', description: 'Funding to attach braille signage and verbal audio-beacons onto public buildings.' }
    ],
    scenarios: [
      { id: 'fully_accessible', name: 'Universal Accessible City', description: 'Heavily fund tactile pavement curb ramp retrofits and install audio guides across transit corridors.', sliders: { ramp_budget: 18, low_income_passes: 80, braille_indicators: 1200 }, metricsDelta: { tactile_ramps: 1.58, accessible_transit: 1.45, inclusive_employment: 1.35 } }
    ],
    visionPresets: [
      { id: 'cam_access_1', title: 'ADA Sidewalk Curb Ramp (CCTV Diagnostic)', imageUrl: '/src/assets/images/street_accessibility_1783264708667.jpg', description: 'Curb ramp sidewalk diagnostic view showing textured paving and grade slopes.', promptHint: 'Verify ADA tactile paving alignment and curb slope transition. Outline visual blocks or structural damage.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'access_mandate', title: 'Universal Transit Accessibility Audit', type: 'Policy Brief', description: 'Command a complete visual audit and upgrade directive for all non-compliant transit stations.', defaultInputs: { target_ward: 'Ward 2 Transit Terminals', retrofit_standards: 'ADA Section 508 and Tactile Tiles', completion_deadline: '12 Calendar Months' } }
    ],
    knowledgeBase: `UNIVERSAL MUNICIPAL ACCESSIBILITY POLICIES:
- Sidewalk ramp retrofits containing yellow tactile warning textures reduce blind resident sidewalk slips and traffic collisions by 88%.
- Subsidized transit passes for disabled cohorts trigger a 3x increase in weekly shopping and hospital visits, reducing long-term home isolation.
- Adding high-contrast tactile signage and audio guidance beacons to historic landmarks increases overall disabled tourism foot traffic by 45%.`
  },
  {
    id: 'disaster',
    name: 'Disaster Response & Recovery',
    category: 'Governance & Services',
    iconName: 'FlameKindling',
    summary: 'Coordinate post-storm recovery efforts, secure critical shelter stockpiling levels, and extend multi-channel alert range indicators.',
    metrics: [
      { id: 'evacuation_speed', name: 'Avg Evacuation Time', value: 110, unit: 'min', change: '-5.1%', trend: 'down', status: 'good', description: 'Time needed to fully clear primary coastal or river zone populations during warnings.' },
      { id: 'stockpile_level', name: 'Shelter Stockpile Reserves', value: 58, unit: '%', change: '+8.2%', trend: 'up', status: 'warning', description: 'Readiness levels of medical supplies, clean drinking water, and rations across active shelters.' },
      { id: 'alert_range', name: 'Multi-Channel Alert Coverage', value: 72, unit: '%', change: '+2.1%', trend: 'up', status: 'neutral', description: 'Percent of the population receiving emergency alerts on cell phones, sirens, and community speakers.' }
    ],
    sliders: [
      { id: 'disaster_defense', name: 'Storm & Flood Walls Budget', min: 5, max: 100, value: 30, step: 5, unit: '$M', description: 'Earmarked resources to build physical sea walls, clean channels, and reinforce bridges.' },
      { id: 'shelter_reserve_spend', name: 'Emergency Supply Stockpiling', min: 100, max: 2000, value: 600, step: 100, unit: '$k', description: 'Funding dedicated to keeping emergency shelters fully stocked.' },
      { id: 'early_warnings', name: 'Siren & Mobile Alert Expansion', min: 50, max: 500, value: 150, step: 25, unit: '$k', description: 'Funding to purchase long-range radio repeaters, sirens, and cell broadcast grids.' }
    ],
    scenarios: [
      { id: 'crisis_shield', name: 'Fortified Disaster Resilience', description: 'Heavily fund storm barriers and shelter stockpiles, paired with modern cell alert arrays.', sliders: { disaster_defense: 85, shelter_reserve_spend: 1800, early_warnings: 450 }, metricsDelta: { evacuation_speed: -0.35, stockpile_level: 1.55, alert_range: 1.35 } }
    ],
    visionPresets: [
      { id: 'cam_disaster_1', title: 'Sea Wall Barrier (Drone Scan)', imageUrl: '/src/assets/images/street_accessibility_1783264708667.jpg', description: 'Drone observation of physical concrete sea-walls and water-drainage levels.', promptHint: 'Examine concrete structures for cracks, drainage clogging, or blockages. Assess disaster risk levels.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'disaster_alert_draft', title: 'Severe Storm Evacuation Warning', type: 'Alert Circular', description: 'Draft a high-priority evacuation warning with coordinates and emergency centers.', defaultInputs: { hurricane_strength: 'Category 3 Storm Surge', primary_evac_route: 'Highway 9 Northbound Corridor', emergency_centers: 'Central Stadium & Metro High Gyms' } }
    ],
    knowledgeBase: `MUNICIPAL EMERGENCY HAZARD PLANS & STANDARDS:
- Comprehensive drainage and seawall reinforcement projects offset regional post-storm insurance damage payouts by $8.00 for every $1 spent.
- Ensuring shelter food/water stockpiles are kept above 80% prevents outbreak occurrences of water-borne ailments in post-disaster camps.
- Cell broadcast warning notifications reach 98% of active citizens within 12 seconds, saving an estimated 4.5 lives per 10,000 residents during flash flooding.`
  },
  {
    id: 'tourism',
    name: 'Tourism & Local Development',
    category: 'Infrastructure',
    iconName: 'Building',
    summary: 'Grow local merchant revenue streams, support historical preservation sites, and boost hotel occupancy rates.',
    metrics: [
      { id: 'hotel_occupancy', name: 'Hotel Occupancy Rate', value: 64, unit: '%', change: '+3.1%', trend: 'up', status: 'neutral', description: 'Percentage of active city hotel and lodging rooms occupied weekly.' },
      { id: 'merchant_rev', name: 'Local Merchant Revenue', value: 142, unit: 'pts', change: '+8.5%', trend: 'up', status: 'good', description: 'Index monitoring retail transactions and dining revenues in historical centers.' },
      { id: 'historic_preservation', name: 'Preserved Landmark Index', value: 52, unit: '%', change: '+1.2%', trend: 'up', status: 'warning', description: 'Percent of historic landmarks restored with active tourist signage and structural protections.' }
    ],
    sliders: [
      { id: 'marketing_spend', name: 'Tourism Advertising Campaigns', min: 1, max: 15, value: 4, step: 1, unit: '$M', description: 'National advertising campaigns promoting local arts, food, and culture.' },
      { id: 'merchant_grants', name: 'Small Business Heritage Grants', min: 100, max: 2000, value: 500, step: 100, unit: '$k', description: 'Grants allocated for local boutique shops, traditional artisans, and family diners.' },
      { id: 'heritage_events', name: 'Funded Cultural Festivals', min: 1, max: 12, value: 3, step: 1, unit: 'festivals', description: 'Annual community cultural street fairs and arts exhibitions funded by the city.' }
    ],
    scenarios: [
      { id: 'golden_heritage', name: 'Vibrant Tourism & Culture', description: 'Launch massive heritage ad campaigns paired with dense small business merchant grants and monthly street fairs.', sliders: { marketing_spend: 12, merchant_grants: 1800, heritage_events: 10 }, metricsDelta: { hotel_occupancy: 1.35, merchant_rev: 1.45, historic_preservation: 1.25 } }
    ],
    visionPresets: [
      { id: 'cam_tourism_1', title: 'Historic Square Entrance', imageUrl: '/src/assets/images/street_accessibility_1783264708667.jpg', description: 'Historical square camera monitoring pedestrian volumes and landmark accessibility.', promptHint: 'Analyze foot traffic flows, storefront visibility, and cultural site pathways. Offer tourist engagement recommendations.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'tourism_advisory', title: 'Heritage Festival Operations Plan', type: 'Policy Brief', description: 'Generate street closure schedules, merchant zones, and policing directives for neighborhood street fairs.', defaultInputs: { event_name: 'Summer Artisan Street Fair', pedestrian_corridor: 'Old Quarter Blocks 2-5', expected_vendors: '120 Local Small Businesses' } }
    ],
    knowledgeBase: `TOURISM AND SMALL BUSINESS STIMULUS FRAMEWORK:
- Public cultural street festivals increase adjacent restaurant and merchant sales by 115% during event weekends, with lasting local brand exposure.
- Allocating direct grants to renovate historic store facades attracts 35% more pedestrian traffic and prevents vacancy rates from rising in historic alleys.
- Tourism ad campaigns focusing on local culinary history generate an average return of $12 in city sales-tax revenue for every marketing dollar spent.`
  },
  {
    id: 'social',
    name: 'Community Support & Social Impact',
    category: 'Community Wellbeing',
    iconName: 'HeartHandshake',
    summary: 'Promote food security, provide stable homeless shelter beds, and run local youth mentorship programs.',
    metrics: [
      { id: 'food_security', name: 'Food Insecurity Rate', value: 14.8, unit: '%', change: '-1.5%', trend: 'down', status: 'warning', description: 'Percentage of households lacking consistent, secure access to nutritious food.' },
      { id: 'shelter_beds', name: 'Homeless Shelter Capacity', value: 72, unit: '%', change: '+5.4%', trend: 'up', status: 'neutral', description: 'Average percent utilization of warm emergency overnight shelter beds.' },
      { id: 'mentorship_reach', name: 'Youth Mentorship Signups', value: 480, unit: 'youth/yr', change: '+22%', trend: 'up', status: 'good', description: 'Total under-resourced teenagers paired with long-term professional mentors.' }
    ],
    sliders: [
      { id: 'food_bank_subsidy', name: 'Food Bank Distribution Budget', min: 100, max: 2000, value: 500, step: 100, unit: '$k', description: 'Funding allocated for organic food banks and community gardens.' },
      { id: 'shelter_funding', name: 'Homeless Support & Rehousing', min: 1, max: 15, value: 4, step: 1, unit: '$M', description: 'Funding to build transitional housing apartments and operate social care clinics.' },
      { id: 'youth_programs', name: 'Youth Mentorship & Sports Centers', min: 50, max: 500, value: 125, step: 25, unit: '$k', description: 'Resource grants dedicated to organizing after-school coaching and peer-guidance counseling.' }
    ],
    scenarios: [
      { id: 'social_shield', name: 'Compassionate Care Network', description: 'Establish deep food distribution subsidies and expand rehousing apartments while fully funding youth centers.', sliders: { food_bank_subsidy: 1800, shelter_funding: 12, youth_programs: 450 }, metricsDelta: { food_security: -0.42, shelter_beds: 1.28, mentorship_reach: 1.55 } }
    ],
    visionPresets: [
      { id: 'cam_social_1', title: 'Community Distribution Center', imageUrl: '/src/assets/images/waste_dump_1783264682182.jpg', description: 'Exterior photo of a modern food distribution bank in a city neighborhood.', promptHint: 'Examine loading bay safety, accessibility of food supply structures, and space organization. Suggest improvements.', mimeType: 'image/jpeg' }
    ],
    workflowTemplates: [
      { id: 'social_impact_brief', title: 'Transitional Housing Resource Plan', type: 'Policy Brief', description: 'Structure caseworker quotas, rehabilitation services, and construction timelines for rehousing projects.', defaultInputs: { target_beds: '150 Unit Transitional Suites', supportive_service_budget: '$1.5 Million', operational_agency: 'Municipal Social Care Board' } }
    ],
    knowledgeBase: `SOCIAL WELFARE AND COMMUNITY WELLBEING DECREES:
- Each dollar dedicated to community food bank logistics unlocks $4.20 worth of healthy food donations, reducing severe neighborhood malnutrition indices.
- Supportive transitional housing programs with integrated mental/physical health services are 4x more effective at maintaining long-term resident housing stability than emergency overnight shelters alone.
- Mentored teenagers demonstrate a 40% reduction in high-school dropouts and a 55% higher likelihood of continuing to higher college learning.`
  }
];
