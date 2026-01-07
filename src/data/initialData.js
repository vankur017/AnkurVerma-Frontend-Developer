

export const initialNodes = [

  { 
    id: '1', 
    type: 'homeNode', 
    data: { 
        label: 'Home',
       
        sections: [
            { id: 'sec-1', title: 'Hero' },
            { id: 'sec-2', title: 'Features' },
            { id: 'sec-3', title: 'Testimonials' },
            { id: 'sec-4', title: 'CTA' },
            { id: 'sec-5', title: 'Footer' }
        ] 
    }, 
    position: { x: 0, y: 0 } 
  },

  
  { id: '2', data: { label: 'About' }, position: { x: 0, y: 0 } },
  { id: '3', data: { label: 'Services' }, position: { x: 0, y: 0 } },
  { id: '4', data: { label: 'Blog' }, position: { x: 0, y: 0 } },
  { id: '5', data: { label: 'Contact' }, position: { x: 0, y: 0 } },

 
  { id: '6', data: { label: 'Service Detail 1' }, position: { x: 0, y: 0 } },
  { id: '7', data: { label: 'Service Detail 2' }, position: { x: 0, y: 0 } },
  

  { id: '8', data: { label: 'Blog Post 1' }, position: { x: 0, y: 0 } },
  { id: '9', data: { label: 'Blog Post 2' }, position: { x: 0, y: 0 } },
  { id: '10', data: { label: 'Author Page' }, position: { x: 0, y: 0 } },


  { id: '11', data: { label: 'Location Info' }, position: { x: 0, y: 0 } },
  { id: '12', data: { label: 'Support Page' }, position: { x: 0, y: 0 } },
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true },
  { id: 'e1-4', source: '1', target: '4', type: 'smoothstep', animated: true },
  { id: 'e1-5', source: '1', target: '5', type: 'smoothstep', animated: true },
  
  { id: 'e3-6', source: '3', target: '6', type: 'smoothstep' },
  { id: 'e3-7', source: '3', target: '7', type: 'smoothstep' },
  
  { id: 'e4-8', source: '4', target: '8', type: 'smoothstep' },
  { id: 'e4-9', source: '4', target: '9', type: 'smoothstep' },
  { id: 'e4-10', source: '4', target: '10', type: 'smoothstep' },
  
  { id: 'e5-11', source: '5', target: '11', type: 'smoothstep' },
  { id: 'e5-12', source: '5', target: '12', type: 'smoothstep' },
];