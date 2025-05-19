import {test} from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';

test.afterEach(async ({page, context}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshotFileName = `${testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${Date.now()}.png`;
        const screenshotPath = path.join('allure-results', screenshotFileName);
        await page.screenshot({path: screenshotPath, fullPage: true});

        testInfo.attachments.push({
            name: 'Screenshot',
            path: screenshotPath,
            contentType: 'image/png'
        });
        if (context) {
            await context.close();
        }

        const video = testInfo.attachments.find(att => att.name === 'video');
        if (video?.path) {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const videoFileName = `${testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.webm`;
                const videoDestPath = path.join('allure-results', videoFileName);
                await fs.copyFile(video.path, videoDestPath);

                testInfo.attachments.push({
                    name: 'Test Video',
                    path: videoDestPath,
                    contentType: 'video/webm'
                });
            } catch (error) {
                console.error('Error copying video file:', error);
            }
        }
    }
});
