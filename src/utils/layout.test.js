import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getLayoutedElements } from './layout';
import { initialNodes, initialEdges } from '../data/initialData';

describe('Layout Engine', () => {
  it('should return nodes with positions', () => {
   
    const { nodes } = getLayoutedElements(initialNodes, initialEdges);

    expect(nodes[0].position.x).toBeDefined();
    expect(nodes[0].position.y).toBeDefined();
  });

  it('should place the Home node at the top (Level 1)', () => {
    const { nodes } = getLayoutedElements(initialNodes, initialEdges);
    
    const homeNode = nodes.find(n => n.id === '1');
    const serviceNode = nodes.find(n => n.id === '3'); 
   
    expect(homeNode.position.y).toBeLessThan(serviceNode.position.y);
  });
});


describe('Data Integrity', () => {
  it('should have the correct static hierarchy', () => {

    const homeNode = initialNodes.find(n => n.id === '1');
    expect(homeNode).toBeDefined();
    expect(homeNode.data.label).toBe('Home');
   
    const homeToServices = initialEdges.find(e => e.source === '1' && e.target === '3');
    expect(homeToServices).toBeDefined();
   
    const servicesToDetail1 = initialEdges.find(e => e.source === '3' && e.target === '6');
    expect(servicesToDetail1).toBeDefined();
  });

  it('Home node should have 5 draggable sections', () => {
    const homeNode = initialNodes.find(n => n.type === 'homeNode');
 
    expect(homeNode.data.sections).toHaveLength(5);
    expect(homeNode.data.sections[0].title).toBe('Hero');
    expect(homeNode.data.sections[4].title).toBe('Footer');
  });
});


describe('Persistence Logic', () => {
  
  beforeEach(() => {
   
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    };
  });

  it('should save flow to localStorage', () => {
  
    const mockFlow = { 
        nodes: [{ id: '1', data: { label: 'Test' } }], 
        edges: [] 
    };
  
    localStorage.setItem('hierarchy-flow', JSON.stringify(mockFlow));

    expect(localStorage.setItem).toHaveBeenCalledWith(
        'hierarchy-flow', 
        JSON.stringify(mockFlow)
    );
  });

  it('should load flow from localStorage', () => {
   
    const mockSavedData = JSON.stringify({ 
        nodes: [{ id: '1' }], 
        edges: [] 
    });
    global.localStorage.getItem.mockReturnValue(mockSavedData);

    
    const loadedData = localStorage.getItem('hierarchy-flow');

    expect(localStorage.getItem).toHaveBeenCalledWith('hierarchy-flow');
    expect(JSON.parse(loadedData)).toEqual({ nodes: [{ id: '1' }], edges: [] });
  });
});