package org.eoc.di.auto;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.log4j.Logger;
import org.eoc.di.auto.beans.SetterBean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ReferenceSetterTest {

    final Logger logger = Logger.getLogger(ReferenceSetterTest.class);

    @Autowired
    private SetterBean bean = null;

    /**
     * Tests bean.
     */
    @Test
    public void testName() {   
        assertNotNull("Setter bean instance is null.", bean);
        
        String name = bean.getName();
        
        assertNotNull("bean is null.", name);
        
        String expected = "Value populated by ref";
        
        assertEquals("bean should be '" + expected + "'.", expected, name);

        logger.info("message='" + name + "'");
    }
    
}
