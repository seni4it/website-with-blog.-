import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  readingTime: number;
  featuredImage: string;
  tags: string[];
  content: string;
  htmlContent?: string;
}

// Since we're in a browser environment, we'll need to fetch the markdown files
// In a real implementation, this would be handled by a build process
export async function getAllPosts(): Promise<BlogPost[]> {
  // For now, we'll use the JSON data as a fallback
  // In production, this would read from the markdown files
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Fallback to static data
    return getStaticPosts();
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Helper function to convert markdown to HTML
export function markdownToHtml(markdown: string): string {
  return marked(markdown);
}

// Static posts data for fallback
function getStaticPosts(): BlogPost[] {
  return [
    {
      id: '1',
      slug: 'advanced-microscope-techniques',
      title: 'Advanced Microscope Techniques in Modern Endodontics',
      excerpt: 'Exploring the latest microscope technologies and techniques that are revolutionizing root canal treatments and improving patient outcomes.',
      author: 'Dr. Shimon Roitman',
      category: 'Clinical Techniques',
      date: '2024-12-15T10:00:00Z',
      readingTime: 8,
      featuredImage: '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png',
      tags: ['Microscopy', 'Technology', 'Clinical Excellence'],
      content: `# Advanced Microscope Techniques in Modern Endodontics

The integration of dental operating microscopes has fundamentally transformed the practice of endodontics. As practitioners, we now have unprecedented visualization capabilities that directly translate to improved treatment outcomes.

## Evolution of Microscopy in Endodontics

The journey from loupes to high-powered microscopes represents one of the most significant advances in our field. Modern microscopes offer:

- **Magnification ranges** from 2.5x to 30x
- **Superior illumination** with LED and xenon light sources
- **Digital documentation** capabilities
- **Ergonomic advantages** for practitioner health

## Key Techniques for Optimal Visualization

### 1. Proper Positioning and Angulation

The microscope should be positioned to provide a direct line of sight into the access cavity. This often requires:

- Patient positioning at 11 o'clock for maxillary teeth
- Mirror techniques for indirect vision
- Proper assistant positioning for four-handed dentistry

### 2. Illumination Strategies

Effective illumination is crucial for identifying:

- **Calcified canals**: Use oblique lighting to create shadows
- **Cracks and fractures**: Transillumination techniques
- **MB2 canals**: Specific angulation and light intensity

### 3. Documentation Best Practices

High-quality documentation serves multiple purposes:

- Patient education and case acceptance
- Legal documentation
- Professional development and case studies
- Insurance documentation

## Clinical Applications

### Locating Hidden Canals

Statistics show that the MB2 canal in maxillary molars is present in over 90% of cases but is often missed without magnification. Key strategies include:

1. **Troughing technique**: Systematic removal of dentin
2. **Champagne bubble test**: Using sodium hypochlorite
3. **Staining techniques**: Methylene blue application

### Managing Complications

The microscope is invaluable for:

- **Separated instrument removal**: Direct visualization of the fragment
- **Perforation repair**: Precise placement of MTA or bioceramic materials
- **Post removal**: Ultrasonic techniques under magnification

## Future Directions

The integration of digital technologies continues to evolve:

- **3D visualization systems**
- **Augmented reality overlays**
- **AI-assisted canal detection**
- **Real-time collaboration capabilities**

## Conclusion

Mastering microscope techniques is no longer optional in modern endodontics—it's essential for providing the highest standard of care. Continuous education and practice are key to maximizing the potential of this transformative technology.`
    },
    {
      id: '2',
      slug: 'case-study-complex-retreatment',
      title: 'Case Study: Complex Retreatment of a Failed Root Canal',
      excerpt: 'A detailed walkthrough of a challenging retreatment case involving a maxillary molar with persistent apical periodontitis.',
      author: 'Dr. Shimon Roitman',
      category: 'Clinical Cases',
      date: '2024-12-20T14:00:00Z',
      readingTime: 10,
      featuredImage: '/lovable-uploads/78edbdfc-906b-4b3f-b44f-5bcedbf2144c.png',
      tags: ['Retreatment', 'Case Study', 'Apical Periodontitis'],
      content: `# Case Study: Complex Retreatment of a Failed Root Canal

This case demonstrates the importance of thorough diagnosis and advanced techniques in managing failed endodontic treatments.

## Patient Presentation

A 45-year-old female patient presented with:

- **Chief complaint**: Persistent discomfort in tooth #14
- **History**: Root canal treatment performed 3 years ago
- **Symptoms**: Mild pain on percussion, occasional spontaneous pain
- **Medical history**: Non-contributory

## Diagnostic Findings

### Clinical Examination

- Mild percussion sensitivity
- No visible swelling or sinus tract
- Existing PFM crown with good margins
- Probing depths within normal limits

### Radiographic Analysis

**Periapical radiograph revealed**:
1. Previous root canal filling short of apex in all canals
2. Persistent periapical radiolucency (5mm diameter)
3. Possible untreated MB2 canal
4. No obvious root fracture

**CBCT findings**:
- Confirmed presence of untreated MB2 canal
- Periapical lesion extending to maxillary sinus floor
- No evidence of root fracture
- Adequate remaining tooth structure

## Treatment Planning

After discussing options with the patient, we proceeded with non-surgical retreatment. The treatment plan included:

1. **Access through existing crown**
2. **Removal of previous root filling material**
3. **Location and treatment of MB2 canal**
4. **Thorough disinfection protocol**
5. **Obturation with bioceramic sealer**

## Treatment Procedure

### Visit 1: Access and Cleaning

**Step 1: Access Preparation**
- Rubber dam isolation
- Access through PFM crown using diamond burs
- Ultrasonic refinement of access cavity

**Step 2: Gutta-Percha Removal**
- ProTaper Universal Retreatment files (D1, D2, D3)
- Chloroform as solvent for efficient removal
- Microscope verification of complete removal

**Step 3: MB2 Canal Location**
- Ultrasonic troughing between MB1 and palatal orifices
- Located MB2 canal 2mm mesial to MB1
- Negotiated with C+ files and established glide path

**Step 4: Working Length Determination**
- Electronic apex locator confirmation
- Radiographic verification
- Working lengths: MB1-20mm, MB2-19mm, DB-21mm, P-22mm

### Visit 2: Shaping and Obturation

**Shaping Protocol**:
- ProTaper Gold system to F2 in all canals
- Copious irrigation with 5.25% NaOCl
- EDTA for smear layer removal
- Ultrasonic activation of irrigants

**Obturation**:
- Continuous wave technique
- BC Sealer (bioceramic sealer)
- Backfill with thermoplasticized gutta-percha
- Temporary restoration with Cavit

## Follow-up and Outcome

### 6-Month Follow-up
- Patient asymptomatic
- No percussion sensitivity
- Radiographic evidence of healing
- Reduction in lesion size

### 12-Month Follow-up
- Complete resolution of symptoms
- Normal periapical appearance
- Functional tooth with good prognosis

## Key Learning Points

1. **CBCT imaging** can reveal missed anatomy
2. **Microscope use** is essential for locating MB2 canals
3. **Bioceramic sealers** enhance healing potential
4. **Patient communication** is crucial for case acceptance

## Clinical Pearls

- Always suspect an untreated canal in failed cases
- Use ultrasonic tips judiciously to avoid perforation
- Consider cone beam imaging for complex retreatments
- Document thoroughly at each step

## Conclusion

This case illustrates that many "failed" root canals can be successfully retreated when proper diagnosis and contemporary techniques are employed. The key to success lies in identifying the cause of failure and addressing it comprehensively.`
    },
    {
      id: '3',
      slug: 'rotary-instrumentation-guide',
      title: 'Complete Guide to Rotary Instrumentation',
      excerpt: 'Master the art of rotary instrumentation with proven techniques and protocols.',
      author: 'Dr. Shimon Roitman',
      category: 'Technology',
      date: '2024-12-05T09:00:00Z',
      readingTime: 6,
      featuredImage: '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png',
      tags: ['Rotary', 'Instrumentation', 'Technique'],
      content: `# Complete Guide to Rotary Instrumentation

Rotary instrumentation has revolutionized endodontic treatment.`
    },
    {
      id: '4',
      slug: 'patient-anxiety-management',
      title: 'Managing Patient Anxiety in Endodontics',
      excerpt: 'Effective strategies for creating a comfortable treatment environment.',
      author: 'Dr. Shimon Roitman',
      category: 'Patient Education',
      date: '2025-01-03T11:00:00Z',
      readingTime: 5,
      featuredImage: '/lovable-uploads/78edbdfc-906b-4b3f-b44f-5bcedbf2144c.png',
      tags: ['Patient Care', 'Anxiety', 'Communication'],
      content: `# Managing Patient Anxiety

Effective anxiety management improves treatment outcomes.`
    },
    {
      id: '5',
      slug: 'practice-efficiency-optimization',
      title: 'Optimizing Practice Efficiency',
      excerpt: 'Proven strategies for streamlining your endodontic practice workflow.',
      author: 'Dr. Shimon Roitman',
      category: 'Practice Management',
      date: '2024-12-28T16:00:00Z',
      readingTime: 7,
      featuredImage: '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png',
      tags: ['Efficiency', 'Management', 'Workflow'],
      content: `# Practice Efficiency Optimization

Maximize efficiency while maintaining quality care.`
    },
    {
      id: '6',
      slug: 'microscopy-advanced-techniques',
      title: 'Advanced Microscopy Techniques',
      excerpt: 'Unlock the full potential of dental operating microscopes.',
      author: 'Dr. Shimon Roitman',
      category: 'Clinical Techniques',
      date: '2024-12-12T08:30:00Z',
      readingTime: 9,
      featuredImage: '/lovable-uploads/711d1ae8-8371-4a6b-bb15-341475f9ccff.png',
      tags: ['Microscopy', 'Visualization', 'Advanced'],
      content: `# Advanced Microscopy Techniques

Precision visualization for superior outcomes.`
    }
  ];
}